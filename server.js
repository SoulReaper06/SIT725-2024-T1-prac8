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

app.get('/addTwonumbers/:firstNumber/:SecondNumber', function(req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var SecondNumber = parseInt(req.params.SecondNumber);

  if (isNaN(firstNumber) || isNaN(SecondNumber)) {
      res.status(400).json({ error: "Both should be a number" });
  } else {
      var result = firstNumber + SecondNumber;
      res.status(200).json({ result: result });
  }
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
