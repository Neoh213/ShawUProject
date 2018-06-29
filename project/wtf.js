var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser")
var faker = require('faker');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))

//sets and links up to the mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'DJ',
  database : 'practice',
  password : ''   //your root user's password
});


app.get("/", function(req, res){
  var q ="SELECT COUNT(*) as count FROM users";
  connection.query(q, function (err,results){
    if (err) throw err;
    var count = results[0].count;
    res.send("count is" + count);
  });
});

app.get("/joke", function(req,res){
    res.send("haha that's funny")
});



app.listen(3000, function(){
    console.log("Server running on 8080!")
});
