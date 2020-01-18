//Imports
const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');


// root index route
router.get('/', async function(req, res) {
  let issues;
  try {
    issues = await Issue.find().sort( { createdAt: 'desc' }).limit(10).exec();        // This will find all the issues in the database and sort them. exec is used to execute the code.
  } catch(err) {
    issues = [];
  } 
  res.render('index', { issues: issues });
});


//Export
module.exports = router;

