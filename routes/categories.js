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
router.post('/', async function(req, res) {
  const category = new Category({
    name: req.body.name
  });
  try {
    const newCategory = await category.save()                            // awaits for category.save to finish then populate the "newCategory" variable
    // res.redirect(`categories/${newCategory.id}`);
    res.redirect(`categories`);
  } catch(err) {
    res.render('categories/new', {
      category: category,
      errorMessage: 'Error creating category'
    });    
  }
});









//Export
module.exports = router;