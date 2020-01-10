const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  issueUpdatedDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now
  },
  issueImage: {
    type: String,

  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };