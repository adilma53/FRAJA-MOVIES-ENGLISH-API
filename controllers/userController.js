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
