//Imports
const express = require('express');
const router = express.Router();


// root index route
router.get('/', function(req, res) {
  res.render('index');
});


//Export
module.exports = router;

