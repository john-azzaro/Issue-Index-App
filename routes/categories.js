//Imports
const express = require('express');
const router = express.Router();


// Routes
// All Categories Route
router.get('/', function(req, res) {
  res.render('categories/index');
});

//Create New Category
router.get('/new', function(req, res) {
  res.render('categories/new')
});

// 

//Export
module.exports = router;