import { fileURLToPath } from 'url';
import { dirname } from 'path';

// // Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// -------------------
import userRoutes from './routes/userRoutes.js';
import showRoutes from './routes/showRoutes.js';
import authRoutes from './auth/routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
// ------------------------------
import cors from 'cors';
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

var corsOptions = {
  origin: ['http://localhost:5173', 'https://fraja-movies-english.vercel.app'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Parse incoming JSON requests
app.use(express.json());
// Use the express.urlencoded() middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));
// ----------------
const MONGO_URL = process.env.MONGO_URL;
// ------------------
// Define the path to your static files
const staticPath = __dirname + '/public';

// Serve static files (HTML, CSS, JavaScript, etc.) from the "public" folder
app.use(express.static(staticPath));
// ---------------------
app.get('/', (req, res) => {
  const LOCAL_OR_DEPLOYED = process.env.LOCAL_OR_DEPLOYED || 'local';
  // res.send('hello from adil api');
  res.render(__dirname + '/public/index.html', { LOCAL_OR_DEPLOYED });
});

app.use(
  '/api',
  userRoutes,
  showRoutes,
  commentRoutes,
  authRoutes,
  collectionRoutes
);

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
