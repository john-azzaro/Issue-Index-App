//Is development environment?
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


//Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
mongoose.Promise = global.Promise;
const app = express();


//Routers
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/categories');
const issueRouter = require('./routes/issues');


//Configuration
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout"); 


//Middleware
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use("/", indexRouter);
app.use('/categories', categoryRouter);
app.use('/issues', issueRouter);


//Database
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true, useUnifiedTopology: true 
});
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose...'))


//Routes -- See "routes" folder.


//Server
let server;
server = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on Port 3000...');
});
