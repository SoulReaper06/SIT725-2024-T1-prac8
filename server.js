const express = require('express');
const bodyParser = require('body-parser');
//const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = "mongodb+srv://jonatjmathew08:zffmrBVwaGL0LnFS@deakin.mocsaum.mongodb.net/?retryWrites=true&w=majority&appName=deakin"


async function connectDb() {
  try {
    await mongoose.connect(mongoURI);
    console.log("You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
connectDb().catch(console.dir);

const adopterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: String,
  email: String,
  address: String,
  description: String,
  imageUrl: String
});

const petSchema = new mongoose.Schema({
  petName: String,
  description: String,
  imageUrl: String
});

const adopter = mongoose.model('Adopter', adopterSchema);

const pet = mongoose.model('Pets', petSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submitAdopter', (req, res) => {
  const newAdopter = new adopter({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    mobileNumber: req.body.number,
    email: req.body.email,
    address: req.body.address,
    description: req.body.description,
    imageUrl: req.body.imageurl
  });

  newAdopter.save()
    .then(savedAdopter => {
      console.log('Adopter saved successfully:', savedAdopter);
      res.redirect('/');
    })
    .catch(err => {
      console.error('Error saving adopter:', err);
      res.status(500).send('Error saving Adopter to database');
    });
});

app.post('/submitPet', (req, res) => {
  const newPet = new pet({
    petName: req.body.pet_name,
    description: req.body.description,
    imageUrl: req.body.imageurl
  });

  newPet.save()
    .then(savedPet=> {
      console.log('Pet saved successfully:', savedPet);
      res.redirect('/');
    })
    .catch(err => {
      console.error('Error saving pet:', err);
      res.status(500).send('Error saving pet to database');
    });
});

app.use(express.static('public'));


app.get('/api/pets', async (req, res) => {
  try {
      const pets = await pet.find();
      res.status(200).json(pets);
  } catch (err) {
      console.error('Error fetching cards:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

