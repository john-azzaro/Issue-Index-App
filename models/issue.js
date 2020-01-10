const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  solution: {
    type: String,
  },
  imageName: {
    type: String,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };