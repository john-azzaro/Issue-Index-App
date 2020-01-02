//Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


// Instantiation
mongoose.Promise = global.Promise;
const app = express();


//Configuration
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout"); 


//Module Imports
const indexRouter = require("./routes/index");


//Middleware
app.use(expressLayouts);
app.use(express.static('public'));
app.use("/", indexRouter);


//Routes -- See "routes" module.


//Server
let server;

server = app.listen('3000', function() {
  console.log('Your app is listening on Port 3000...');
});
