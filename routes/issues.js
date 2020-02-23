//Imports and variables
const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');
const { Category } = require('../models/category');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];  


// Routes
// All Issues Route
router.get('/', async function(req, res) {
let searchOptions = {}
  if (req.query.title != null && req.query.title !== '') {
    searchOptions.title = new RegExp(req.query.title, 'i')
  }   
  try {
    const issues = await Issue.find(searchOptions)
    res.render('issues/index', {   
      issues: issues, 
      searchOptions: req.query  
    });
  } catch(err) {
    res.redirect('/');   
  }
});


//New Issue Route
router.get('/new', async function(req, res) {
  renderNewPage(res, new Issue());
});


// Create Issue Route
router.post('/', async function(req, res) {    
  const fileName = req.file != null ? req.file.filename : null;  
  const issue = new Issue({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    solution: req.body.solution,
  });
  saveImage(issue, req.body.image);        
  try { 
    const newIssue = await issue.save();
    // res.redirect('issues/${newIssue.id}');
    res.redirect('issues');
  } catch(err) {
    renderNewPage(res, issue, true); 
  }
});


// Show Route
router.get('/:id', async function(req, res) {
  try {
    const issue = await Issue.findById(req.params.id)
                             .populate('category')
                             .exec()              
    res.render('issues/show', {issue: issue})    
  } catch(err) {
    res.redirect('/');  
  }
});


//Edit Issue Route
router.get('/:id/edit', async function(req, res) {
  try {
    const issue = await Issue.findById(req.params.id);             // get the issue by awaiting the Issue and finding by ID
    renderEditPage(res, issue);
  } catch(err) {
    res.redirect('/')
  } 
});


// Render New Page function
async function renderNewPage(res, issue, hasError = false) { 
  try {
    const categories = await Category.find({}); 
    const params = {
      categories: categories,
      issue: issue
    }
    if (hasError) {
      params.errorMessage = 'Error Creating Issue';
    }
    // const issue = new Issue();
    res.render('issues/new', params);
  } catch (err) {
    res.redirect('/issues');  
  }
}


function saveImage(issue, imageEncoded) {  
  if(imageEncoded == null)  {
    return 
  }
  const image = JSON.parse(imageEncoded);        
  if (image != null && imageMimeTypes.includes(image.type)) {       
    issue.image = new Buffer.from(image.data, 'base64')            
    issue.imageType = image.type   
    }                  
}



//Export
module.exports = router;
