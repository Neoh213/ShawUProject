/*
      This code is for a Shaw U project. it is a protoype that gets information
      from a user and inserts that data to a MySQL database. In the future it will
      link up with information from a device which will provide the inoformation
      to be inserted into MySQL
*/

//required variables to allow express, mysql and node to function
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser")

//faker is used to insert made up data
var faker = require('faker');
//this variable stores the decibel abount to be displayed to the user.
var newDecibel;

//needed for express and to parse info
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));

//sets and links up to the mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'DJ',
  database : 'practice',
  password : ''   //your root user's password
});

//home page and shows the count of the stores on the command terminal
app.get("/", function(req, res){
      var info = "SELECT COUNT(*) as count FROM app_practice";
      connection.query(info, function(err, results) {
//    if(err) throw err;
      var count = results[0].count;
      //renders the home page.
      res.render("home", {count: count});
      });
});


// shows decibel levels
app.get("/decibel", function(req, res){
    //  res.send("Decibel level is: " + newDecibel);
      res.render("decibel",{ newDecibel: newDecibel});
});



// adds data from forms to database
app.post('/register', function(req, res){
        var decibel = req.body.decibel;
        newDecibel = decibel;
        var data = [];
        //stores the items I want in an array
        data.push([
             faker.company.companyName(),
             req.body.decibel,
             req.body.time
        ]);

/****** this comment is only for debugging *********
/console.log(whenwhere); shows info if I need to check on particular items
console.log("decibel is " + req.body.decibel + "time is: " + req.body.time);
******** this comment is only for debugging *********/

        var q = 'INSERT INTO app_practice (store, sound_level, whenwhere) VALUES ?';

        connection.query(q, [data], function(err, result) {
                  console.log(err);
                  console.log(result);
                  // for degugging:  res.send("Decibel level is: " + req.body.decibel )
                  res.redirect("/decibel");// to redirect page;
        });
});

/*for debugging, checks to make sure node is working
app.get("/joke", function(req,res){
    res.send("haha that's funny")
});
*/

//shows port access and prints info to the console if port is running
app.listen(3000, function(){
    console.log("Server running on 3000!")
});
