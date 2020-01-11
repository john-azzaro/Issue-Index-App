const mongoose = require('mongoose');

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
  issueDescription: {
    type: String,
    required: true
  },
  solutionDescription: {
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