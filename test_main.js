var data = require('./database.js');
var user = require('./User.js');
var express = require('express');
var san = require('sanitize');
var app = express();


//var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

//Make sure that the root directory of our git repo is mapped to /group12
var rootdir = __dirname + '/pages'
app.use('/', express.static(rootdir));


//sanitize user input
app.use(san.middleware);


// Make sure we can parse the post body-data
//app.use(bodyParser.urlencoded({ extended: rue }))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('json spaces', 40);

//Log all incoming request
app.use((req, res, next) => {
   console.log("<--- incoming request to " + req.url + " with body " + JSON.stringify(req.body)+ "--->");
   return next();
});

app.post('/post', function(req, res) {
  databaseQuery(req, res)
});

app.post('/products', function(req, res) {
   data.dbProducts(req, res);
});

app.post('/product_info', function(req, res) {
  data.dbProductInfo(req, res);
});

app.post('/makers', function(req, res) {
  data.dbMakers(req, res);
});

app.post('/categories', function(req, res) {
  data.dbCategories(req, res);
});

app.post('/register', function(req, res) {
   data.dbRegister(req, res);
});

app.post('/login', function(req, res) {
   data.dbLogin(req, res);
});

app.post("/logout", function(req, res) {
  data.dbLogout(req, res);
})

app.post('/user', function(req, res) {
   data.dbUserInfo(req, res);
});

app.post('/edit_user', function(req, res) {
  data.dbUserEdit(req, res);
});

app.post('/buy', function(req, res) {
   console.log("Got a buy request: " +  req.body.product_id);
   data.dbBuy(req, res);
});

app.post('/history', function(req, res) {
   data.dbHistory(req, res);
})

app.post('/comments', function(req, res) {
  data.dbComments(req, res);
});

app.post('/post_comment', function(req, res) {
  data.dbPostComment(req, res);
});

// Listen on the port
app.listen(8003, function() {
  console.log('Express listening to port 8003');
});

