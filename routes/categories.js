//Imports
const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');


// Routes
// All Categories Route
router.get('/', async function(req, res) {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const categories = await Category.find(searchOptions);
    res.render('categories/index', { 
      categories: categories,
      searchOptions: req.query
    });
  } catch(err) {
    res.redirect('/');
  }
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
    const newCategory = await category.save()   
    // res.redirect(`categories/${newCategory.id}`);
    res.redirect(`categories`);
  } catch(err) {
    res.render('categories/new', {
      category: category,
      errorMessage: 'Error creating category'
    });    
  }
});


// Show categories
router.get('/:id', function (req, res) {        // get route for categories, pass in "/:id" which means that an id is going to be passed along with the request.
  res.send('Show Category ' + res.params.id)     // this req.params.id on the request object will get all the parameters we defined inside the url
})                 


// Edit categories page
router.get('/:id/edit', function (req, res) {           // use id again because we need it to select what we want to edit.
  res.send('Edit Category ' + res.params.id)           // this req.params.id on the request object will get all the parameters we defined inside the url
})





//Export
module.exports = router;