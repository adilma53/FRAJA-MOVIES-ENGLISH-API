import express from 'express';
const router = express.Router();

import {
  createShow,
  getShows,
  getShow,
  deleteShow,
  updateShow,
} from '../controllers/showController.js';

router.post('/show/add/:tmdbId', createShow);

router.put('/show/update/:tmdbId', updateShow);

router.delete('/show/delete/:tmdbId', deleteShow);

router.get('/show/allshows', getShows);

router.get('/show/:tmdbId', getShow);

export default router;
