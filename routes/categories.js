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
    res.redirect(`categories/${newCategory.id}`);
  } catch(err) {
    res.render('categories/new', {
      category: category,
      errorMessage: 'Error creating category'
    });    
  }
});


// Show categories
router.get('/:id', function (req, res) {     
  res.send('Show Category ' + req.params.id);   
});               


// Edit categories route
router.get('/:id/edit', async function (req, res) {     
  try {
    const category = await Category.findById(req.params.id);
    res.render('categories/edit', { category: category });
  } catch(err) {
    res.redirect('/categories'); 
  }  
});


// Update categories route
router.put('/:id', async function(req, res) {          
  let category;
  try {
    category = await Category.findById(req.params.id);
    category.name = req.body.name;
    await category.save()   
    res.redirect(`/categories`);   // /${category.id}
  } catch(err) {
    if (category == null) {
      res.redirect('/');
    } else {
      res.render('categories/edit', {
      category: category,
      errorMessage: 'Error updating category'
    });  
    } 
  }    
});


// Delete categories route
router.delete('/:id', function(req, res) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    category.name = req.body.name;                              // remove because you dont need to worry about updating the author name.
    await category.remove()                                     // remove instead of save.
    res.redirect(`/categories`);   // /${category.id}
  } catch(err) {
    if (category == null) {
      res.redirect('/');
    } else {
      res.render('categories/edit', {
      category: category,
      errorMessage: 'Error updating category'
    });  
  } 
}  
  
  
  // res.send('Delete Category ' + req.params.id)    
});

//Export
module.exports = router;