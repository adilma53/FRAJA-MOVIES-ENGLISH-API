const { User } = require('../models/userModel');
const { Movie } = require('../models/movieModel');

const { createMovie } = require('./movieController');
const { Comment } = require('../models/commentModel');

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

// -----------------------------------------------------

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
  // ----------------------
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
// -----------------------------------------------------

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
  // ----------------------
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
// -----------------------------------------------------

// exports.removeMovieFromHistory = async (req, res) => {
//   // addMovieToHistory
//   const whichList = req.params.listType;
//   // addToList
//   var movie = await Movie.findOne({ tmdbId: req.body.tmdbId });
//   if (!movie) {
//     movie = await Movie.create({
//       ...req.body,
//       tmdbId: req.body.tmdbId,
//     });
//   }
//   try {
//     // Find the user by firebaseId and update their watched list
//     const movieToRemove = {};
//     movieToRemove[whichList] = movie?._id;

//     const user = await User.updateOne(
//       { firebaseId: req.params.firebaseId },
//       { $pull: movieToRemove },
//       { new: true }
//     );

//     if (!movie) {
//       res.status(404).send(`movie with tmdbId:${req.body.tmdbId} not found`);
//     } else {
//       res.status(200).json(movie);
//     }
//   } catch (error) {
//     res.status(500);
//     throw new Error(error.message);
//   }
// };
// -----------------------------------------------------
exports.addFriend = async (req, res) => {
  var friend = await User.findOne({ firebaseId: req.params.friendFirebaseId });
  if (!friend) {
    res
      .status(404)
      .send(`friend with firebaseId:${req.params.friendFirebaseId} not found`);
  }
  // ----------------------
  try {
    // Find the user by firebaseId and update their watched list
    const newFriend = {};
    newFriend['friends'] = friend?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $addToSet: newFriend },
      { new: true }
    );

    if (!friend) {
      res
        .status(404)
        .send(
          `friend with firebaseId:${req.params.friendFirebaseId} not found`
        );
    } else {
      res.status(200).json(friend);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
// -----------------------------------------------------
exports.removeFriend = async (req, res) => {
  var friend = await User.findOne({ firebaseId: req.params.friendFirebaseId });
  if (!friend) {
    res
      .status(404)
      .send(`friend with firebaseId:${req.param.friendFirebaseId} not found`);
  }
  // ----------------------
  try {
    // Find the user by firebaseId and update their watched list
    const friendToRemove = {};
    friendToRemove['friends'] = friend?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $pull: friendToRemove },
      { new: true }
    );

    if (!friend) {
      res
        .status(404)
        .send(
          `friend with firebaseId:${req.params.friendFirebaseId} not found`
        );
    } else {
      res.status(200).json(friend);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
// -----------------------------------------------------
exports.addComment = async (req, res) => {
  const getUser = await User.findOne({ firebaseId: req.params.firebaseId });
  try {
    const comment = await Comment.create({
      ...req.body,
      author: getUser._id,
    });

    const newComment = {};
    newComment['comments'] = comment?._id;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $addToSet: newComment },
      { new: true }
    );

    if (!comment) {
      res.status(404).send(`comment could not be created try again`);
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
// -----------------------------------------------------
exports.deleteComment = async (req, res) => {
  try {
    const commentTORemove = {};
    commentTORemove['comments'] = req.body.commentId;

    const user = await User.updateOne(
      { firebaseId: req.params.firebaseId },
      { $pull: commentTORemove },
      { new: true }
    );

    const comment = await Comment.findByIdAndDelete(req.body.commentId);

    if (!comment) {
      res.status(404).send(`comment could not be removed try again`);
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};
