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
  var id = parseInt(req.body.id);
  var newTask = req.body.newTask;
  var completeStatus = req.body.completeStatus;
  // INSERT INTO "books" ("author", "title") VALUES ('David Mitchel','Cloud Atlas');
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // We connected!!!!
      db.query('INSERT INTO "to_do_list" ("list_item", "completed") VALUES ($1,$2);',
               [newTask, completeStatus], function(queryError, result){
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

router.put('/update/:taskId', function(req,res) {
    var id = req.params.taskId;
    // var completed = req.body.completed;
    console.log(id);
    // console.log(completed);
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database');
        res.send(500);
      } else {
        // We connected
        db.query("UPDATE to_do_list SET completed ='TRUE' WHERE id = $1;",
        [id], function(queryError,result) {

          // result is the result from our query
          done(); // releases the connection we have to the pool
          if (queryError) {
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            //console.log(result);
            res.sendStatus(201); // succesful insert status
          } //else
        }); //db.query
      }//else
    });
});



router.delete('/delete/:id', function(req,res) {
  var id = parseInt(req.params.id);
  // DELETE FROM "books" WHERE "id" = 47;
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
      res.send(500);
    } else {
      // We connected
      db.query('DELETE FROM "to_do_list" WHERE "id" = $1',[id], function(queryError,result) {

        // result is the result from our query
        done(); // releases the connection we have to the pool
        if (queryError) {
          console.log('Error making query');
          res.send(500);
        } else {
          //console.log(result);
          res.sendStatus(200);
        }
      });
    }
  });
});


module.exports = router;
