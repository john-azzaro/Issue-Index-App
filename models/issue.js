const mongoose = require('mongoose');
const path = require('path');

const imageBasePath = 'uploads/images'; 

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  description: {
    type: String,
    required: true
  },
  solution: {
    type: String,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now
  },
  image: {   
    type: Buffer,  
  },
  imageType: {   
    type: String,
  }
});

//// Use if image desired on issue page.
// issueSchema.virtual('imagePath').get(function() {
//   if (this.image != null && this.imageType != null) {
//     return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
//   }
// })

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
module.exports.imageBasePath = imageBasePath;