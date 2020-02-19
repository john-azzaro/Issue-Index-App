const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

categorySchema.pre('remove', function(next) {      // pre allows you to run an action before the method occurs, and pass "remove" and a function with the callback "next", which will mean it is ok to move forward unless it is an error.

});

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };