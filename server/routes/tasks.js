var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'chi', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

//GETTING tasks FROM DB
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('SELECT * FROM "to_do_list";', function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          // console.log(result); // Good for debugging
          res.send(result.rows);
        }
      });
    }
  });
});//END OF ROUTER.GET

router.post('/addTask', function(req, res){
  console.log(req.body);
  var newTask = req.body.list_item;

  // INSERT INTO "books" ("author", "title") VALUES ('David Mitchel','Cloud Atlas');
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('INSERT INTO "to_do_list" ("list_item")' +
               ' VALUES ($1);',
               [list_item], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});//END OF ROUTER.POST

module.exports = router;
