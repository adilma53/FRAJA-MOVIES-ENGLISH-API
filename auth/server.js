require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// ----------------
const app = express();
const port = 3000;
app.use(express.json());
// ----------------

const mainRoutes = require('./routes/mainRoutes');

// ----------------
const MONGO_URL = process.env.MONGO_URL;
// ----------------

app.use('/api', mainRoutes);

app.get('/', (req, res) => {
  res.send('hello from adil api');
});
// ----------------

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
