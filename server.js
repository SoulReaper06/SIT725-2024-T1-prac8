const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const adopterController = require('./controllers/adopterController');
const petController = require('./controllers/petController');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

const mongoURI = "mongodb+srv://jonatjmathew08:zffmrBVwaGL0LnFS@deakin.mocsaum.mongodb.net/?retryWrites=true&w=majority&appName=deakin"

async function connectDb() {
  try {
    await mongoose.connect(mongoURI);
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
connectDb().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.post('/submitAdopter', adopterController.submitAdopter);
app.post('/submitPet', petController.submitPet);
app.get('/api/pets', petController.getPets);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('send-message', (message) => {
    console.log('Message received:', message);
    io.emit('receive-message', message);
  });
  setInterval(() => {
    socket.emit('number',parseInt(Math.random()*10));
  },1000);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app, server };
