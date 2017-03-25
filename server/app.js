var express = require('express');
var app = express();
var port = 5000;
// var bodyParser = require('body-parser');
// var pg = require(pg);

app.use(express.static("server/public"));





app.listen(port, function(){
  console.log("Listening on port: ", port);
});
