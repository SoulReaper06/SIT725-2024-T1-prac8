const Pet = require('../models/pet');

exports.submitPet = async (req, res) => {
  const newPet = new Pet({
    petName: req.body.pet_name,
    description: req.body.description,
    imageUrl: req.body.imageurl
  });

  try {
    const savedPet = await newPet.save();
    console.log('Pet saved successfully:', savedPet);
    res.redirect('/');
  } catch (err) {
    console.error('Error saving pet:', err);
    res.status(500).send('Error saving pet to database');
  }
};

exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (err) {
        console.error('Error fetching pets:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndRemove(req.params.petId);
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        console.error('Failed to delete pet:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};