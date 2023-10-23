require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

// ----------------
const MONGO_URL = process.env.MONGO_URL;
// ------------------

app.use('/api', userRoutes, movieRoutes);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('adil Connected to MongoDB');

    app.listen(port, () => {
      console.log(`adil server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
