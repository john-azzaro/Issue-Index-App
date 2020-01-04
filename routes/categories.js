//Imports
const express = require('express');
const router = express.Router();


// Routes
// All Categories Route
router.get('/', function(req, res) {
  res.render('categories/index');
});

//New Category Route
router.get('/new', function(req, res) {
  res.render('categories/new')
});

// Create Category Route
router.post('/', function(req, res) {
  res.render()
});


//Export
module.exports = router;