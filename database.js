var sqlite3 = require('sqlite3').verbose();
var sqls = require('sqlstring');
var xss = require('scriptags');
var sha256 = require("js-sha256");

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

function closeDB(db) {
  db.close( (err) => {
    if (err) {
      return console.error('There was an error closing the database connection: ' + err);
    }
  });
  console.log('Database connection closed');
}

exports.dbInsert = () => {
  var db = openDB();
  
  closeDB(db);
}

exports.dbSelect = (req, res, table, value) => {
    var db = openDB();
    console.log('Doing Select');
    //Because we cannot input a table into prepared statements we sanatize it.
    var statement = db.prepare('SELECT * FROM ' + sqls.escape(table) + ' WHERE (username)=(?)');
    statement.get(value, function(err, row) {
 	if (err) {
        console.error(JSON.stringify(err));
      //	res.send('An error has occured, check the logs for more info');
      }
      else  {
        console.log(row);
        res.json(row);
      }
    statement.finalize();
    });
    closeDB(db);
}

exports.dbProducts = (req, res) => {
    var db = openDB();
    console.log('Searching for products ' + JSON.stringify(req.body));
    var order_id = req.body.order_id;
    var search_text = req.body.search_text;
    var limit = req.body.limit;
    if (!order_id)
      order_id = "0";
    if (!search_text)
      search_text = "";
    if (!limit)
      limit = 10;

    console.log("order_id: " + order_id);

    var orderClausule = "";
    switch(order_id)
    {
      case "0": orderClausule = "ORDER BY Manufactures.name"; break;
      case "1": orderClausule = "ORDER BY Products.name ASC"; break;
      case "2": orderClausule = "ORDER BY Products.price ASC"; break;
      case "3": orderClausule = "ORDER BY Products.price DESC"; break;
    }
    console.log("order clausule: " + orderClausule);
    if (!req.body.maker_id || req.body.maker_id == "-1")
    {
      var statement = db.prepare("SELECT Products.product_id, Products.name, Products.image, Products.price, Manufactures.name as maker, Manufactures.maker_id FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id AND Products.name LIKE '%' || ? || '%' " + orderClausule + " LIMIT ?");
      statement.all(search_text, limit, function(err, rows) {
        if(err) {
        console.log(err);
        res.send({}.err = 'An error has occured, check the logs.');
        }
        else {
          res.send(rows);
        }
     });
     statement.finalize();
    }
   else
   {
     var statement = db.prepare("SELECT Products.product_id, Products.name, Products.image, Products.price, Manufactures.name as maker, Manufactures.maker_id FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id AND Products.name LIKE '%' || ? || '%' AND Manufactures.maker_id = ? " + orderClausule + " LIMIT ?");
     statement.all(search_text, req.body.maker_id, limit, function(err, rows) {
       if(err) {
         console.log(err)
         res.send({}.err = "An error has occured");
       }
       else {
         res.send(rows);
       }
     });
     statement.finalize();
   }
   closeDB(db);
}

exports.dbProductInfo = (req, res) => {
  if (!req.body.product_id) {
    res.send({ "err" : "No product_id provided!" });
    return;
  }
  var db = openDB();
  var statement = db.prepare("SELECT Products.product_id, Products.name, Manufactures.name as maker, Products.image, Products.price FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id AND Products.product_id = ?");
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
   db.run("INSERT INTO Users (username, first_name, last_name, address, email, password, salt) VALUES ('"+username+"',' "+first_name+"','"+last_name+"','"+address+"', '"+email+"', '"+password+"', '"+salt+"')", err => {
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
      var statement = db.prepare("INSERT INTO Transactions (product_id, user_id, date) VALUES(?, ?, ?)");
      statement.run(req.body.product_id, user_id, date, function(err) {
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
    var statement = db.prepare("SELECT Products.product_id, Products.name, Products.image, Products.price, Transactions.Date FROM Products, Transactions WHERE Products.product_id = Transactions.product_id AND Transactions.user_id = ? ORDER BY Transactions.date DESC");
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
