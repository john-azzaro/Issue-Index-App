const mongoose = require('mongoose');
const Issue = require('./issue');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

categorySchema.pre('remove', function(next) {   
  Issue.find({category: this.id}, function (err, issues) {    // if any issues for this catgory
    if(err) {                                                 // if error...
      next(err);                                              // pass the error on (an prevent you from removing )
    } else if (issues.length > 0) {
      
    }
  });    
});

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };