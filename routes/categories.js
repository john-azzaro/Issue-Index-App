//Imports
const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');


// Routes
// All Categories Route
router.get('/', function(req, res) {
  res.render('categories/index');
});


//New Category Route
router.get('/new', function(req, res) {
  res.render('categories/new', { category: new Category() });
});


// Create Category Route
router.post('/', function(req, res) {
  const category = new Category({
    name: req.body.name
  });
  category.save(function (err, newCategory) {
    res.render('categories/new', {
      category: category,
      errorMessage: 'Error creating category'
    });
  });

  res.send(req.body.name);
});


//Export
module.exports = router;