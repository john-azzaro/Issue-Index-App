//Imports
const express = require('express');
const router = express.Router();
const { Issue } = require('../models/issue');
const { Category } = require('../models/category');


// Routes
// All Issues Route
router.get('/', async function(req, res) {
  res.send('All issues works!')
});


//New Issue Route
router.get('/new', async function(req, res) {
  try {
    const categories = await Category.find({});                                           // get all categories, categories equal to await (i.e. wait until) Category model and find everything (i.e. {})
    const issue = new Issue();                                                         // create a new Issue
    res.render('issues/new', {                                                        // if successful, render issues/new and pass in variables
      categories: categories,                                                             // send categories to new page and...
      issue: issue                                                                     // send issues to the new page.
    })                      
  } catch (err) {
    res.redirect('/issues');                                             // if the are any errors, redirect back to the /issues page.
  }
  
  
  
  
  res.send('New issues works!')
});


// Create Issue Route
router.post('/', async function(req, res) {
  res.send('Create issues works!')
});


//Export
module.exports = router;
