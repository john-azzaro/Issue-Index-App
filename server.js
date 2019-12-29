//Imports and instantiation
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();


// Settings and Configuration
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


//Module Imports



//Middleware


//Routes
app.get('/', function(req, res) {
  res.send('This is a test');
});


//Server
let server;

server = app.listen('3000', function() {
  console.log('Your app is listening on Port 3000...');
});
