const { User } = require('../models/userModel');
const { Movie } = require('../models/movieModel');

const { createMovie } = require('./movieController');

exports.createUser = async (req, res) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    res.status(300).send('this email already exists');
  } else {
    try {
      const user = await User.create({
        ...req.body,
        firebaseId: req.params.firebaseId,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.params.firebaseId });

    if (!user) {
      res.status(200).send('user not found');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      firebaseId: req.params.firebaseId,
    });

    if (!user) {
      res.status(404).send('user firebaseId not found');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        firebaseId: req.params.firebaseId,
      },
      req.body,
      { new: true }
    );

    if (!user) {
      res
        .status(404)
        .send(`user with firebaseId:${req.params.firebaseId} not found`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

exports.addToWatchLater = async (req, res) => {
  // const whichList = req.params.listType;
  // addToList
  var movie = await Movie.findOne({ tmdbId: req.body.tmdbId });
  if (!movie) {
    movie = await Movie.create({
      ...req.body,
      tmdbId: req.body.tmdbId,
    });
  }
  // ----------------------
  try {
    // Find the user by firebaseId and update their watched list

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $push: { watchLater: movie?._id } },
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

// add movies to user

// remove movies from user
