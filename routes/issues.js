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
    const categories = await Category.find({});
    const issue = new Issue();
    res.render('issues/new', {
      categories: categories,
      issue: issue
    });
  } catch (err) {
    res.redirect('/issues');  
  }
});


// Create Issue Route
router.post('/', async function(req, res) {
  res.send('Create issues works!')
});


//Export
module.exports = router;
