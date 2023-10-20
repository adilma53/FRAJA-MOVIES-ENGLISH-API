const { User } = require('../models/userModel');

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

// update user

// delete user
