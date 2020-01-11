const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  problem: {
    type: String,
    required: true
  },
  comments: {
    type: String,
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

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };