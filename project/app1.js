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
  password : 'Neoheartless1'   //your root user's password
});

//home page and shows the count of the stores on the command terminal
app.set("view engine", "ejs");
app.get("/", function(req, res){
  var info = "SELECT COUNT(*) as count FROM app_practice";
  connection.query(info, function(err, results) {
    if(err) throw err;
   var count = results[0].count;
     res.render("home", {count: count});
  });
});



// var time = req.body.time;


// adds data from forms to database
app.post("/register", function(req, res){
  var data = [];

      data.push([
          faker.company.companyName(),
          req.body.decibel,
          faker.date.past()

      ]);
var q = 'INSERT INTO app_practice (store, sound_level, whenwhere) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});
});

app.get("/joke", function(req,res){
    res.send("haha that's funny")
});



app.listen(3000, function(){
    console.log("Server running on 8080!")
});
