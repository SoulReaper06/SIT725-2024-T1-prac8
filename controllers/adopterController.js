const Adopter = require('../models/adopter');

exports.submitAdopter = async (req, res) => {
  const newAdopter = new Adopter({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    mobileNumber: req.body.number,
    email: req.body.email,
    address: req.body.address,
    description: req.body.description,
    imageUrl: req.body.imageurl
  });

  try {
    const savedAdopter = await newAdopter.save();
    console.log('Adopter saved successfully:', savedAdopter);
    res.redirect('/');
  } catch (err) {
    console.error('Error saving adopter:', err);
    res.status(500).send('Error saving Adopter to database');
  }
};