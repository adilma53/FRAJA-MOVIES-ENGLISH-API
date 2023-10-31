const express = require('express');
const router = express.Router();

const {
  createShow,
  getShows,
  getShow,
  deleteShow,
  updateShow,
} = require('../controllers/showController');

router.post('/show/add/:tmdbId', createShow);

router.put('/show/update/:tmdbId', updateShow);

router.delete('/show/delete/:tmdbId', deleteShow);

router.get('/show/allshows', getShows);

router.get('/show/:tmdbId', getShow);

module.exports = router;
