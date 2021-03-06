var sqlite3 = require('sqlite3').verbose();
var sqls = require('sqlstring');
var xss = require('striptags');
var sha256 = require("js-sha256");

//Subroutine for return a database instance
function openDB() {
  let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
      console.log('Database connection could not be established: ' + err);
      return null;
    }
    console.log('Database connection has been established');
  });
  return db;
}


//Subroutine for properly closing a database instance
function closeDB(db) {
  db.close( (err) => {
    if (err) {
      return console.error('There was an error closing the database connection: ' + err);
    }
  });
  console.log('Database connection closed');
}

//Return a list of products based on filters in the request body
exports.dbProducts = (req, res) => {
    var db = openDB();
    console.log('Searching for products ' + JSON.stringify(req.body));
    var order_id = req.body.order_id;
    var search_text = req.body.search_text;
    var limit = req.body.limit;
    var offset = req.body.offset;
    var maker_id = req.body.maker_id;
    var cat_id = req.body.cat_id;
    if (!order_id)
      order_id = "0";
    if (!search_text)
      search_text = "";
    if (!limit)
      limit = 10;
    if (!offset)
      offset = 0;
    if (!maker_id || maker_id == "-1")
        maker_id = null; 

    cat_id_list = "";
    if (!cat_id || cat_id == "-1")
        cat_id = null
    else {
        cat_id_list = cat_id;
    }

    var orderClausule = "";
    switch(order_id)
    {
      case "0": orderClausule = "ORDER BY Manufactures.name"; break;
      case "1": orderClausule = "ORDER BY Products.name ASC"; break;
      case "2": orderClausule = "ORDER BY Products.price ASC"; break;
      case "3": orderClausule = "ORDER BY Products.price DESC"; break;
    }
    var result = [];
    //quite aware here if the SQL injection vulnerability but could not find a solution and for  purily the sake of
    //just this assignment settled upon the fact that I much rather have this functionality that be perfectly security
    var statement = db.prepare("SELECT Products.product_id, Products.cat_id, Products.name, Products.image, Products.price, Manufactures.name as maker, Manufactures.maker_id FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id AND ((? IS NULL) OR (Products.maker_id = ?)) AND ((? IS NULL) OR (Products.cat_id IN ("+cat_id_list+"))) AND (Products.name LIKE ('%' || ? || '%') OR  Manufactures.name LIKE ('%' || ? || '%')) " + orderClausule + " LIMIT ?, ?");
    statement.all(maker_id, maker_id, cat_id, search_text, search_text, offset, limit, function(err, rows) {
      if(err) {
      console.log(err);
      res.send({}.err = 'An error has occured, check the logs.');
      }
      else {
        result = rows;
      }
    });

    //In order to build up the page perfectly we gather some meta data for the previous query.
    statement.finalize(function() {
      console.log("Collecting COUNT meta data...");
      var statement = db.prepare("SELECT COUNT(Products.product_id) as COUNT FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id AND ((? IS NULL) OR (Products.maker_id = ?)) AND ((? IS NULL) OR (Products.cat_id IN ("+cat_id_list+"))) AND (Products.name LIKE ('%' || ? || '%') OR Manufactures.name LIKE ('%' || ? || '%')) " + orderClausule);
      statement.get(maker_id, maker_id, cat_id, search_text, search_text, function(err, row) {
        if (err) {
          console.log(err)
          return;
        }
        result.unshift(row);
        //res.send(result);
      });
      statement.finalize(function() {
        console.log("Collecting Category meta data...");
        var statement = db.prepare("SELECT Products.cat_id FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id AND ((? IS NULL) OR (Products.maker_id = ?)) AND ((? IS NULL) OR (Products.cat_id IN ("+cat_id_list+"))) AND (Products.name LIKE ('%' || ? || '%') OR  Manufactures.name LIKE ('%' || ? || '%')) " + orderClausule);
        statement.all(maker_id, maker_id, cat_id, search_text, search_text, function(err, rows) {
          if(err) {
          console.log(err);
          res.send({}.err = 'An error has occured, check the logs.');
          }
          else {
            var obj = {};
            obj.cats = rows.map(x => x.cat_id);
            result.unshift(obj);
            res.send(result);
          }
        });
        statement.finalize();
      });
    });
    closeDB(db);
}

//Get the product info a specific product.
exports.dbProductInfo = (req, res) => {
  if (!req.body.product_id) {
    res.send({ "err" : "No product_id provided!" });
    return;
  }
  var db = openDB();
  var statement = db.prepare("SELECT Products.product_id, Categories.cat_name, Products.name, Manufactures.name as maker, Products.image, Products.price FROM Products, Manufactures, Categories WHERE Products.cat_id = Categories.cat_id AND Products.maker_id = Manufactures.maker_id AND Products.product_id = ?");
  statement.get(req.body.product_id, function(err, row) {
    if (err) {
      console.write(err);
      res.send({"err" : "Error getting product info"});
      return;
    }
    if (!row) {
      res.send({"err" : "Product not found!"});
    }
    res.send(row);
  });
  statement.finalize();
  closeDB(db);
}

//Get the comments that are attached to a certain product.
exports.dbComments = (req, res) => {
  var ret = {};
  if (!req.body.product_id) {
    ret.err = "No product_id provided";
    res.send(ret)
    return;
  }
  var db = openDB();
  var statement = db.prepare("SELECT Users.username, Comments.comment FROM Comments, Users WHERE Comments.product_id = ? AND Users.user_id = Comments.user_id");
  statement.all(req.body.product_id, function(err, rows) {
    if (err) {
      console.log(err);
      ret.err = "Could not retrieve comments";
      ret.errcode = 32;
      res.send(ret);
    }
    res.send(rows);
  });
}

//Post a comment to a product.
exports.dbPostComment = (req, res) => {
  var ret = {};
  if (!req.body.product_id || !req.body.comment) {
    ret.err = "Invalid request!";
    res.send(ret);
    return;
  }
  ValidateSession(req.body.token, function(err, user_id) {
    if (err) {
      console.log(err);
      ret.err = err;
      ret.errcode = 32;
      res.send(ret);
      return;
    }
    var db = openDB();
    var statement = db.prepare("INSERT INTO Comments (user_id, comment_id, product_id, comment) VALUES (?, ?, ?, ?)");
    statement.run(user_id, req.body.comment_id, req.body.product_id, xss(req.body.comment), function(err) {
      if (err) {
        console.log(err);
        ret.err = err;
        res.send(ret);
        return;
      }
      ret.message = "Placed comment succesfully!"
      res.send(ret);
    });
    statement.finalize();
    closeDB(db);
  });
}

//Get a list of the the manufacturers.
exports.dbMakers = (req, res) => {
  var db = openDB();
  db.all("SELECT * FROM Manufactures WHERE 1", function(err, rows) {
    if (err) {
      console.log(err);
      res.send({}.err = "An error occured");
      return;
    }
    res.send(rows);
  });
  closeDB(db);
}

//Get a list of the all the categories.
exports.dbCategories = (req, res) => {
  var db = openDB();
  db.all("SELECT * FROM Categories WHERE 1 ORDER BY Parent", function(err, rows) {
    if (err) {
      console.log(err);
      res.send("An error occured");
      return;
    }
    res.send(rows);
  });
  closeDB(db);
}

//Register routine, enforces quite harsh anti-XSS methods.
exports.dbRegister = (req, res) => {
   var ret = {};
   console.log("Got a request for a registration.");
   console.log(JSON.stringify(req.body));
   if (!req.body.username || !req.body.email || !req.body.first_name || !req.body.last_name || !req.body.address || !req.body.password) {
      	console.log("Illegal register request: " + req.body);
        ret.err = "Not all parameters where provided for a registration";
        res.send(ret);
       	return;
   }
   var username = xss(req.body.username);
   var first_name = xss(req.body.first_name);
   var last_name = xss(req.body.last_name);
   var address = xss(req.body.address);
   var email = xss(req.body.email);
   var salt = sha256(Math.random().toString());
   var password = sha256(req.body.password + salt);
   var db = openDB();
   var statement = db.prepare("INSERT INTO Users (username, first_name, last_name, address, email, password, salt) VALUES (?, ?, ?, ?, ?, ?, ?)");
   statement.run(username, first_name, last_name, address, email, password, salt, function(err) {
          if (err) {
                console.log(err); 
                ret.err = "Username is already taken"
                res.send(ret);
                return; 
          }
          ret.message = "You registred succesfully!"
          res.send(ret); 
      });
   closeDB(db);
}

//Login routine, also generates a session to the user.
exports.dbLogin = (req, res) => {
   console.log("Got a login request.");
   var ret = {};
   if (!req.body.username || !req.body.password) {
      console.log("Illegal login request");
      ret.err = "Invalid login request, no username or password.";
      res.send(ret);
      return;
   }
   var user_id;
   var db = openDB();
   var statement = db.prepare("SELECT * FROM Users WHERE Users.username = ?");
   statement.get(xss(req.body.username), function(err, row) {
       var ret = {};
       if (err) {
         console.log(err);
         ret.err = err;
         res.send(ret);
         return;
       }

       if (!row) {
         ret.err = "Username not found!";
         res.send(ret);
         return;
       }

       if (row.password !== sha256(req.body.password + row.salt)) {
         ret.err = "Wrong password!";
         res.send(ret);
         return;
       }
       console.log("Found a user with id: "+row.user_id);

       //Entry point for creating sessions
       CreateSession(row.user_id, function(err, token) {
          if (err) {
            console.log(err);
            ret.err = "Error creating session";
            res.send(ret);
            return;
          }
          console.log("Succesfully created a session: " + token);
          ret.token = token;
          res.send(ret);
       });

   });
   statement.finalize();
   closeDB(db);
}

//Get all the info of specific user for the user page.
exports.dbUserInfo = (req, res) => {
   var ret = {};
   if (!req.body.token) {
      ret.err = "No session token provided!";
      res.send(ret);
      return;
   }
   ValidateSession(req.body.token, function(err, user_id) {
      if (err) {
        console.log(err);
        ret.err = err;
        ret.errcode = 32;
        res.send(ret);
        return;
      }
      
      var db = openDB();
      var statement = db.prepare("SELECT username, address, email, first_name, last_name FROM Users WHERE user_id = ?");
      statement.get(user_id, function(err, row) {
        res.send(row);
      });
      statement.finalize();
      closeDB(db);
   });
}

//Handles the request for editing user information.
exports.dbUserEdit = (req, res) => {
  var ret = {};
  ValidateSession(req.body.token, function(err, user_id) {
    if (err) {
      ret.err = err;
      res.send(ret);
      return;
    }
    var db = openDB();
    var statement = db.prepare("UPDATE Users SET 'username' = ?, 'address' = ?, 'email' = ?, 'first_name' = ?, 'last_name' = ? WHERE user_id = ?");
    var username = xss(req.body.username);
    var address = xss(req.body.address);
    var email = xss(req.body.email);
    var first_name = xss(req.body.first_name);
    var last_name = xss(req.body.last_name);
    statement.run(username, address, email, first_name, last_name, user_id, function(err) {
      if (err) {
        console.log(err);
        ret.err = "Username already taken!";
        res.send(ret);
        return;
      }
      ret.message = "Succesfully updated user info!";
      res.send(ret);
    });
    statement.finalize();
    closeDB(db);
  });
}

//Buy a certain product, user_id is derived from the session token.
exports.dbBuy = (req, res) => {
   var ret = {};
   if (!req.body.token) {
      ret.err = "No session token provided!";
      ret.errcode = 32;
      res.send(ret);
      return;
   }
   ValidateSession(req.body.token, function(err, user_id) {
      if (err) {
        console.log(err);
        ret.err = err;
        ret.errcode = 32;
        res.send(ret);
        return;
      }
      if (!req.body.product_id) {
        ret.err = "product_id not provided";
        res.send(ret);
        return;
      }
      var date = new Date();
      var db = openDB();
      var statement = db.prepare("INSERT INTO Transactions (product_id, user_id, amount, date) VALUES(?, ?, ?, ?)");
      statement.run(req.body.product_id, user_id, req.body.amount, date, function(err) {
         if (err) {
          console.log(err);
          ret.err = "Could not buy product " + req.body.product_id;
          res.send(ret);
        }
        ret.message = "Succesfully bought product " + req.body.product_id;
        res.send(ret);
      });
      statement.finalize();
      closeDB(db);
   }); 
}

//Get the purchase history of a user.
exports.dbHistory = (req, res) => {
  var ret = {};
  if (!req.body.token) {
    ret.err = "No token provided";
    res.send(ret);
  }
  ValidateSession(req.body.token, function(err, user_id) {
    if (err) {
      ret.err = err;
      ret.errcode = 32;
      res.send(ret);
      return;
    }
    var result = [];
    var db = openDB();
    var statement = db.prepare("SELECT Products.product_id, Products.name, Products.image, Products.price, Transactions.date, Transactions.amount FROM Products, Transactions WHERE Products.product_id = Transactions.product_id AND Transactions.user_id = ? ORDER BY Transactions.date DESC");
    statement.all(user_id, function(err, rows)
    {
      if (err) {
        console.log(err)
        ret.err = "Could load history data";
        res.send(ret);
        return;
      }
      res.send(rows);
    });
    statement.finalize();
    closeDB(db);
  });
}

//Log a user out by destroying all sessions attached to the user_id.
exports.dbLogout = (req, res) => {
  console.log("attempting to logout user with token " + req.body.token);
  ValidateSession(req.body.token, (err, user_id) => {
    if (err) {
      console.log(err);
      res.send("something went wrong");
      return;
    }
    console.log("Logging out user " + user_id);
    let db = openDB();
    let statement = db.prepare("DELETE FROM Sessions WHERE user_id = ?")
    statement.run(user_id, function(err) {
      if (err) {
        console.log("error");
        return;
      }
      console.log("removed " + this.changes + " sessions.");      
    });
    statement.finalize(() => res.send("logout succesful"));
  });
}

//Generate a new session and set the expire date to an hour from now.
//Sessions are the result of a sha256 hash of the internal random function and the datastring.
//Granted that the internal random function does not have terribly much entropy, the added datestring
//prevents at least a bruteforce on the Math.random with rainbow tables.
CreateSession = (user_id, callback) =>  {
   console.log("Creating a new session");
   var err_message;
   var token = sha256(Math.random().toString() + new Date());
   var db = openDB();
   var statement = db.prepare("INSERT INTO Sessions (user_id, session_token, expired) VALUES (?, ?, ?)");
   statement.run(user_id, token, new Date() + 1000 * 60 * 100, function(err) {
      if (err) console.log(err);
   });
   statement.finalize();
   closeDB(db);
   callback(err_message, token);
}

//Validate a session from a token, this will also retrieve the attached user_id.
ValidateSession = (token, callback) => {
   console.log("Validating session...");
   if (!token) { //SQL query won't execute otherwise
    callback("Invalid token");
    return;
   }
   var user_id;
   var error;
   var db = openDB();
    var statement = db.prepare("SELECT Users.user_id, Sessions.expired FROM Users, Sessions WHERE Users.user_id = Sessions.user_id AND Sessions.session_token = ?");
    statement.get(token, function(err, row) {
      if (err) {
        conosole.log(err);
        callback("database error");
      }
      if (!row) {
        console.log("Session could not be validated");
        callback("Invalid token");
      }
      else {
        if ( + new Date() > row.expired) {
           console.log("Session expired");
           callback("Session expired");
        } else {
          user_id = row.user_id;
          console.log("User " + user_id + " succesfully validated");
        }
      }
    });
    statement.finalize(function(err) {
        if (err | !user_id) {return}
        var extendSession = db.prepare("UPDATE Sessions SET expired = ? WHERE session_token = ?");
        console.log("Valided but not yet extended... user_id: " + user_id);
        extendSession.run( + new Date() + 1000 * 60 * 100, token, function(err) {
          if (err) {
            console.log("Could not extend session! " + err);
          }
          else {
            console.log("Succesfully extend user " + user_id + " sessiont token");
          }
        });
        extendSession.finalize(function() {
          callback(error, user_id);
        });
    });
  
   closeDB(db);
}
