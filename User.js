var data = require('./database.js');
class User {
  constructor(uname, passw, email, fname, lname, address) {
   this.username = uname;
   this.password = passw;
   this.firstname = fname;
   this.lastname = lname;
   this.email = email;
   this.address = address;
  }
}
