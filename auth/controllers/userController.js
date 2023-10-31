const { User } = require('../models/userModel');

const { hashPassword, verifyHashedPassword } = require('../utils/hashing');
const { createJwtToken } = require('../utils/createJwtToken');

exports.createUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
      return res.status(500).send('this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const data = {
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    };

    const user = await User.create(data);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(500).send('failed to create user try again please');
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      res.status(500).send('no users found in the database');
    } else {
      res.status(200).json(allUsers);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const data = {
      email: email.trim(),
    };

    const user = await User.findOne(data);
    if (!user) {
      return res.status(500).send('invalide email try again');
    }

    const passwordMatch = await verifyHashedPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(500).send('invalide password try again');
    } else {
      // return res.status(500).send('failed to create user try again please');

      const tokenData = { userId: user._id, email };
      const token = await createJwtToken(tokenData);

      user.token = token;

      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
