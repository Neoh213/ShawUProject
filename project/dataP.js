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
var PythonShell = require('python-shell');
var http = require('http').Server(app);
var io = require('socket.io')(http);



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

//will be used throughout the program
var myPythonScriptPath = 'test.py';
var currentSoundLevel = "test";

// Use python shell and interact with python file setup
var PythonShell = require('python-shell');
var util = require("util");
var spawn = require("child_process").spawn;
var process = spawn('python',["test.py"]);

//util.log('readingin')

//grabs python output
process.stdout.on('data',function(chunk){
  currentSoundLevel = chunk.toString('utf8');// buffer to string

console.log(currentSoundLevel);
});
/*********************************************/

var obj = {foo: 1};
setInterval(
  function(){ obj.foo++; },
  1000
);

/*************************************************/

app.get('/value', function(req,res,next){
  res.send(currentSoundLevel);
});

/***************************/
//home page and shows the count of the stores on the command terminal
app.get("/", function(req, res,next){

var info = "SELECT COUNT(*) as count FROM app_practice";
      connection.query(info, function(err, results) {
      if(err) throw err;
      var count = results[0].count;
      //renders the home page.
      var sound_level = 0;
      var time = 0;
      var store = "insert";
      //var currentSoundLevel = "test";
          // received a message sent from the Python script (a simple "print" statement)
          console.log(currentSoundLevel + " in shell");

          var reading = currentSoundLevel;
        console.log(currentSoundLevel + "outside py shell and in get function");


          res.render("high", {sound_level: sound_level, store: store,time: time, reading: reading, obj:obj});
        //  res.send(currentSoundLevel);
        //  res.json(currentSoundLevel);
      });

});



/*********************************************/
io.on('connection', function(socket){
  console.log('a user connected');
});

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


/*************************************************/


//all store information and graphs
app.get("/storeInfo", function(req, res){
  var store = req.body.store;
      var allSoundLevels = "SELECT store, sound_level, whenwhere FROM app_practice WHERE store = \'" +  store + "\' ORDER BY sound_level ASC";

  var num = "SELECT COUNT(*) as count FROM app_practice WHERE store = \'Legros and Sons\'";


      connection.query(allSoundLevels, function(err, results) {
      if(err) throw err;
       var sound_level = results.sound_level;
      // var time = results[0].whenwhere;

      //renders the home page.
      res.render("storeInfo");
  console.log("sound is: "+ sound_level); //for debugging
      });


});



//need to get the highest value of a store
app.post("/high", function(req, res){
  var store = req.body.store;
      var info = "SELECT store, sound_level, whenwhere FROM app_practice WHERE store = \'" +  store + "\' ORDER BY sound_level DESC LIMIT 1";
      connection.query(info, function(err, results) {
      if(err) throw err;
      var sound_level = results[0].sound_level;
      var time = results[0].whenwhere;

      //renders the home page.
      res.render("high", {sound_level: sound_level, store: store, time: time});
    //console.log("sound is: " + sound_level + " at: " + store); for debugging
      });
});
//lowest value of a store
app.post("/low", function(req, res){
  var store = req.body.store;
      var info = "SELECT store, sound_level, whenwhere FROM app_practice WHERE store = \'" +  store + "\' ORDER BY sound_level ASC LIMIT 1";
      connection.query(info, function(err, results) {
      if(err) throw err;
      var sound_level = results[0].sound_level;
      var time = results[0].whenwhere;

    //renders the home page.
      res.render("high", {sound_level: sound_level, store: store, time: time});
    //console.log("sound is: " + sound_level + " at: " + store); for debugging
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



//need to make test this and make a string then find a way to put each item in a loop.
//or better yet just the values for that store.
app.post("/storeInfo", function(req, res){
  var store = req.body.store;
      var info = "SELECT store, sound_level, whenwhere FROM app_practice WHERE store = \'" +  store + "\' ORDER BY sound_level ASC";
      connection.query(info, function(err, results) {
      if(err) throw err;
      // var sound_level = results[0].sound_level;
      // var time = results[0].whenwhere;

      //renders the home page.
      res.render("storeInfo");
    //console.log("sound is: " + sound_level + " at: " + store); for debugging
      });
});
