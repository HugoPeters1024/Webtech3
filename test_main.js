var data = require('./database.js');
var user = require('./User.js');
var express = require('express');
var san = require('sanitize');
var app = express();


//var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

//Make sure that the root directory of our git repo is mapped to /group12 
var rootdir = __dirname + '/webtech3/pages' 
app.use('/group12', express.static(rootdir));


//sanitize user input
app.use(san.middleware);

// Make sure we can parse the post body-data
//app.use(bodyParser.urlencoded({ extended: rue }))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('json spaces', 40);

app.get('/', function(req, res) {
  res.send("Boem jo");
});
app.post('/group12/post', function(req, res) {
  databaseQuery(req, res)
});

app.post('/group12/products', function(req, res) {
   data.dbProducts(req, res);
});

app.post('/group12/register', function(req, res) {
   data.dbRegister(req, res);
});

app.post('/group12/login', function(req, res) {
   //res.redirect('/profile');
   data.dbLogin(req, res);
});

app.post('/group12/user', function(req, res) {
   data.dbUserInfo(req, res);
});

app.post('/group12/buy', function(req, res) {
   console.log("Got a buy request: " +  req.body.product_id);
   data.dbBuy(req, res);
});

// Listen on the port
app.listen(8003, function() {
  console.log('Express listening to port 8003');
});

// Database methods
function databaseQuery(req, res) {
	  switch(req.body.method.toLowerCase()){
		case 'insert':
 		  if(req.body.table && req.body.values) {
		    var statement = db.prepare('INSERT INTO ? VALUES (?)');
		    statement.run(req.body.table, req.body.values);
		    statement.finalize();
		    res.send('OK');
		  }
                  else
                    res.send('Insert statement needs the following data: table, values');
     		  break;
		case 'select':
                  data.dbSelect(req, res, req.body.table, req.body.username);
                  break;
	  }
}
