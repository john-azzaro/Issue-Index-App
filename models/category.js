const mongoose = require('mongoose');
const Issue = require('./issue');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

categorySchema.pre('remove', function(next) {   
  Issue.find({category: this.id}, function (err, issues) {   
    if(err) {                         
      next(err);                        
    } else if (issues.length > 0) {               
      next(new Error('This category still has issues'))
    } else {                             
      next();                                
    }
  });    
});




const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };