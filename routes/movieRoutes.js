const express = require('express');
const router = express.Router();

const {
  createMovie,
  getMovies,
  getMovie,
  deleteMovie,
  updateMovie,
} = require('../controllers/movieController');

router.post('/movie/add/:tmdbId', createMovie);

router.put('/movie/update/:tmdbId', updateMovie);

router.delete('/movie/delete/:tmdbId', deleteMovie);

router.get('/movie/allmovies', getMovies);

router.get('/movie/:tmdbId', getMovie);

module.exports = router;
