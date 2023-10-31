import { fileURLToPath } from 'url';
import { dirname } from 'path';

// // Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// -------------------
import userRoutes from './routes/userRoutes.js';
import showRoutes from './routes/showRoutes.js';

import mongoose from 'mongoose';
import morgan from 'morgan';
// ------------------------------
import express from 'express';
import dontenv from 'dotenv';
dontenv.config();
// ----------------------------
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
// ----------------
const MONGO_URL = process.env.MONGO_URL;
// ------------------
app.get('/', (req, res) => {
  // res.send('hello from adil api');
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/api', userRoutes, showRoutes);

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

export default app;
