//Imports
const express = require('express');
const app = express();

//Module Imports

//Instantiation

//Middleware

//Routes
app.get('/', function(req, res) {
  res.send('This is a test');
});


//Server
let server;

server = app.listen('3000', function() {
  console.log('Server is listening on Port 3000...');
});
