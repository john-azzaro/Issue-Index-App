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

  } catch(err) {
  }
});




  // category.save(function (err, newCategory) {
  //   if (err) {
  //     res.render('categories/new', {
  //       category: category,
  //       errorMessage: 'Error creating category'
  //     });
  //   } else {
  //     // res.redirect(`categories/${newCategory.id}`);
  //     res.redirect(`categories`);
  //   }
  // });






//Export
module.exports = router;