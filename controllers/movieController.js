const { Movie } = require('../models/movieModel');

exports.createMovie = async (req, res) => {
  const email = await Movie.findOne({ tmdbId: req.params.tmdbId });
  if (email) {
    res.status(300).send('this movie already exists');
  } else {
    try {
      const movie = await Movie.create({
        ...req.body,
        tmdbId: req.params.tmdbId,
      });
      res.status(200).json(movie);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ tmdbId: req.params.tmdbId });

    if (!movie) {
      res.status(200).send(`movie with tmdbId:${req.params.tmdbId} not found`);
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({
      tmdbId: req.params.tmdbId,
    });

    if (!movie) {
      res.status(404).send(`movie with tmdbId:${req.params.tmdbId} not found`);
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      {
        tmdbId: req.params.tmdbId,
      },
      req.body,
      { new: true }
    );

    if (!movie) {
      res.status(404).send(`movie with tmdbId:${req.params.tmdbId} not found`);
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
