const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
} = require('../controllers/userController');

router.post('/signup/:firebaseId', createUser);

router.get('/allusers', getUsers);

router.get('/:firebaseId', getUser);

module.exports = router;
