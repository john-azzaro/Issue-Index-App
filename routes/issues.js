//Imports and variables
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Issue = require('../models/issue');
const { Category } = require('../models/category');

const uploadPath = path.join('public', Issue.imageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];  
// const upload = multer({
//   dest: uploadPath,  
//   fileFilter: function (req, file, callback) {     
//     callback(null, imageMimeTypes.includes(file.mimetype));
//   }
// });


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
    imageName: fileName
  });
  saveImage(issue, req.body.image);                                                    // save the image as well as the encoded json image in req.body.image
  try { 
    const newIssue = await issue.save();
    // res.redirect('issues/${newIssue.id}');
    res.redirect('issues');
  } catch(err) {
    if (issue.imageName != null) {
      removeImage(issue.imageName) 
    } 
    renderNewPage(res, issue, true); 
  }
});


// Remove Image if error
function removeImage(fileName) {
  fs.unlink(path.join(uploadPath, fileName), function(err) {       
    if (err) {    
      console.err(err)   
    }
  });
}



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


function saveImage(issue, imageEncoded) {               // check to see if the image is a valid image and if it is, save it to issue.image.
  if(imageEncoded == null)  {
    return 
  }
  const image = JSON.parse(imageEncoded);                                    // next, parse the string (becuase imageEncoded is justa string thats actually JSON) into a JSON object called image.                      
  if (image != null && imageMimeTypes.includes(image.type)) {            // then check to see if the image is not null and is of the correct type AND of the correct type (uncomment mimetypes var). You also want to chnage file to image and mimetype to type to check the image type.
    issue.image = new Buffer.from(image.data, 'base64')                                // if it isnt equal to null and it is a valid type, then we can save the properties to the issue but convert to a buffer and specify that it is also base64 encoded. 
    issue.imageType = image.type                                              // This will allow us to extract out the buffer and convert it back into an image of the correct type.
    }                  
}



//Export
module.exports = router;
