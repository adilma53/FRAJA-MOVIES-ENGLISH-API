const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  login,
} = require('../controllers/userController');
const {
  validateEmailPassLogin,
} = require('../middleware/validateEmailPassLogin');
const {
  validateEmailPassSignup,
} = require('../middleware/validateEmailPassSignup');
const { authorizeToken } = require('../middleware/authorizeToken');

router.post('/signup', validateEmailPassSignup, createUser);

router.post('/:login', validateEmailPassLogin, login);

router.get('/getallusers', getAllUsers);

// testing token authorization
router.get('/private_profile', authorizeToken, async (req, res) => {
  console.log(req.currentUser);
  return res
    .status(200)
    .send(`you are in the private profile of ${req.currentUser.email}`);
});

module.exports = router;
