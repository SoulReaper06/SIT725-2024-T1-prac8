const mongoose = require('mongoose');

const adopterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: String,
  email: String,
  address: String,
  description: String,
  imageUrl: String
});

const Adopter = mongoose.model('Adopter', adopterSchema);

module.exports = Adopter;