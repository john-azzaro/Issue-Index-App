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
    } else if (issues.length > 0) {                           // for the particular issue, if there are issues for the category, do NOT remove the category.
      next(new Error('This category still has issues'))
    } else {                                                 // but if no errors and no issues, then
      next();
    }
  });    
});

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };