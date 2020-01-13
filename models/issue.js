const mongoose = require('mongoose');
const imageBasePath = 'uploads/images'          // path to where the images will be stored

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
  imageName: {
    type: String,
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = { Issue };
module.exports.imageBasePath = imageBasePath;