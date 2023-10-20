const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
  try {
    const card = await User.create(req.body);
    res.status(200).json(card); // Respond with the created card as JSON
  } catch (error) {
    res.status(500); // Set the HTTP status code to 500 (Internal Server Error)
    throw new Error(error.message); // Throw an error with the error message
  }
});

module.exports = {
  createUser,
};
