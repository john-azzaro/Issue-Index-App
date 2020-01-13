//Imports
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Issue } = require('../models/issue');
const { Category } = require('../models/category');
const uploadPath = path.join('public', Issue.imageBasePath)
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']          // What file types we will allow to be uploaded.
const upload = multer({
  dest: uploadPath,                                                         // destinaton set to the upload path (i.e. public/Issue.imageBasePath), which is in the public folder
  fileFilter: function (req, file, callback) {                               // filter files the server will accept, which takes the request, the file itself, and the callback when we're done.
    callback(null)
  }
});


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
  const issue = new Issue({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    solution: req.body.solution
  });
});


//Export
module.exports = router;
