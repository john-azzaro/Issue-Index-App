//Imports and variables
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Issue = require('../models/issue');
const { Category } = require('../models/category');

const uploadPath = path.join('public', Issue.imageBasePath);
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];  
const upload = multer({
  dest: uploadPath,  
  fileFilter: function (req, file, callback) {     
    callback(null, imageMimeTypes.includes(file.mimetype));
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
router.post('/', upload.single('image'), async function(req, res) {    
  const fileName = req.file != null ? req.file.filename : null;  
  const issue = new Issue({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    solution: req.body.solution,
    imageName: fileName
  });
  try {
    const newIssue = await issue.save();
    // res.redirect('issues/${newIssue.id}');
    res.redirect('issues');
  } catch(err) {

  }
});

async function renderNewPage(res, issue, hasError = false) {                   // the asynchronous renderNewPage will use the res variable to render and redirect, the issue variable for rendering new or existing book, and hasError message.
  try {                                                                        // existing route logic from new issue route.
    const categories = await Category.find({});                                //... which selects categories
    const params = {                                                           // relocate parameters in existing render to params variable and pass this new variable to where we had it before.
      categories: categories,
      issue: issue
    }
    if (hasError) {
      params.errorMessage = 'Error Creating Issue'
    }
    // const issue = new Issue();                                              // removed create new issue.
    res.render('issues/new', params);                                          // relocated params
  } catch (err) {
    res.redirect('/issues');  
  }
}



//Export
module.exports = router;
