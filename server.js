const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adopterController = require('./controllers/adopterController');
const petController = require('./controllers/petController');

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

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submitAdopter', adopterController.submitAdopter);
app.post('/submitPet', petController.submitPet);
app.get('/api/pets', petController.getPets);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

