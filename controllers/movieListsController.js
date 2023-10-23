const { User } = require('../models/userModel');
const { Movie } = require('../models/movieModel');

exports.addMovieToList = async (req, res) => {
  const whichList = req.params.listType;
  // addToList
  var movie = await Movie.findOne({ tmdbId: req.body.tmdbId });
  if (!movie) {
    movie = await Movie.create({
      ...req.body,
      tmdbId: req.body.tmdbId,
    });
  }
  try {
    // Find the user by firebaseId and update their watched list
    const newMovie = {};
    newMovie[whichList] = movie?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $addToSet: newMovie },
      { new: true }
    );

    if (!movie) {
      res.status(404).send(`movie with tmdbId:${req.body.tmdbId} not found`);
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.removeMovieFromList = async (req, res) => {
  const whichList = req.params.listType;
  // addToList
  var movie = await Movie.findOne({ tmdbId: req.body.tmdbId });
  if (!movie) {
    movie = await Movie.create({
      ...req.body,
      tmdbId: req.body.tmdbId,
    });
  }
  try {
    // Find the user by firebaseId and update their watched list
    const movieToRemove = {};
    movieToRemove[whichList] = movie?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $pull: movieToRemove },
      { new: true }
    );

    if (!movie) {
      res.status(404).send(`movie with tmdbId:${req.body.tmdbId} not found`);
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
