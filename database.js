var sqlite3 = require('sqlite3').verbose();
var sqls = require('sqlstring');
var xss = require('xss');
var sha256 = require("js-sha256");

function openDB() {
  let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
      console.log('Database connection could not be established');
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
	res.send('An error has occured, check the logs for more info');
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
    console.log('Searching for products');
    var order_id = req.body.order_id;
    if (!order_id)
      order_id = "0";

    console.log("order_id: " + order_id);

    var orderClausule = "";
    switch(order_id)
    {
      case "0": orderClausule = "ORDER BY Manufactures.name"; break;
      case "1": orderClausule = "ORDER BY Products.name ASC"; break;
      case "2": orderClausule = "ORDER BY Products.price ASC"; break;
      case "3": orderClausule = "ORDER BY Products.price DESC"; break;
    }
    if (!req.body.maker_id)
    {
      var statement = 'SELECT Products.product_id, Products.name, Products.image, Products.price, Manufactures.name as maker, Manufactures.maker_id FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id ' + orderClausule;
      db.all(statement, function(err, rows) {
        if(err) {
        console.log(err);
        res.send("An error has occured, check the logs for more info");
        }
        else {
          res.send(rows);
        }
    });
    }
   else
   {
     var statement = "SELECT Products.product_id, Products.name, Products.image, Products.price, Manufactures.name as maker, Manufactures.maker_id FROM Products, Manufactures WHERE Products.maker_id = Manufactures.maker_id AND Manufactures.maker_id = " + req.body.maker_id + " " + orderClausule;
     db.all(statement, function(err, rows) {
       if(err) {
         console.log(err)
         res.send("An error has occured");
       }
       else {
         res.send(rows);
       }
     });
   }
   closeDB(db);
}

exports.dbMakers = (req, res) => {
  var db = openDB();
  db.all("SELECT * FROM Manufactures WHERE 1", function(err, rows) {
    if (err) {
      console.log(err);
      res.send("An error occured");
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
   statement.get(req.body.username, function(err, row) {
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
          console.log("callback hell!");
          if (err) {
            console.log(err);
            ret.err = "Error creating session";
            res.send(ret);
            return;
          }
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
        ret.err = "Could not validate session";
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

exports.dbBuy = (req, res) => {
   var ret = {};
   if (!req.body.token) {
      ret.err = "No session token provided!";
      res.send(ret);
      return;
   }
   ValidateSession(req.body.token, function(err, user_id) {
      if (err) {
        console.log(err);
        ret.err = "Could not validate session";
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
      ret.err = "Invalid session!";
      ret.errcode = 32;
      res.send(ret);
      return;
    }
    var result = [];
    var db = openDB();
    var statement = db.prepare("SELECT Products.name, Products.image, Products.price, Transactions.Date FROM Products, Transactions WHERE Products.product_id = Transactions.product_id AND Transactions.user_id = ? ORDER BY Transactions.date DESC");
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
   statement.run(user_id, token, 55, function(err) {
      console.log(err);
   });
   statement.finalize();
   closeDB(db);
   callback(err_message, token);
}

ValidateSession = (token, callback) => {
   console.log("Validating session...");
   var user_id;
   var error;
   var db = openDB();
   var statement = db.prepare("SELECT Users.user_id FROM Users, Sessions WHERE Users.user_id = Sessions.user_id AND Sessions.session_token = ?");
   statement.get(token, function(err, row) {
     if (!row) {
       error = "Invalid Token";
       callback(error, user_id);
     }
     else {
       user_id = row.user_id;
       callback(error, row.user_id);
     }
   });
   statement.finalize();
   closeDB(db);
}
