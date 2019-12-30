//Imports
const express = require('express');
const router = express.Router();


// root index route
router.get('/', function(req, res) {
  res.send('This is a test')
});


//Export
module.exports = router;

