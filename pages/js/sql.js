var sqlite3 = require('sqlite3').verbose();

function testConnect(){
  var db = new sqlite3.Database('db/test.db', (err) => {
    if (err) {
      return console.error('There was an error connecting to the database');
    }
    console.log('Database connection has been established.');
  });

  db.serialize(() => {
    db.each(`CREATE TABLE test_table (
                name string,
                age integer,
              );`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Created Table');
      });
  });

  db.close((err) => {
    if (err) {
      return console.error('There was an error closing the database connection');
    }
    console.log('Database connection has been closed');
  });
}
