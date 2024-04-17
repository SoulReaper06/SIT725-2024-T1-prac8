const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: String,
  description: String,
  imageUrl: String
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;