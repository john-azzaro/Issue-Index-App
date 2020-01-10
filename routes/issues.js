//Imports
const express = require('express');
const router = express.Router();
const { Issue } = require('../models/issue');


// Routes
// All Issues Route
router.get('/', async function(req, res) {
  res.send('All issues works!')
});


//New Issue Route
router.get('/new', function(req, res) {
  res.send('New issues works!')
});


// Create Issue Route
router.post('/', async function(req, res) {
  res.send('Create issues works!')
});


//Export
module.exports = router;
