//Imports and instantiation
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();


//Configuration
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


//Module Imports



//Middleware
app.use(expressLayouts);
app.use(express.static('public'));



//Routes


//Server
let server;

server = app.listen('3000', function() {
  console.log('Your app is listening on Port 3000...');
});
