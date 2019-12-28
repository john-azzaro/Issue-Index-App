//Imports
const express = require('express');


//Module Imports


//Instantiation
const app = express();


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
