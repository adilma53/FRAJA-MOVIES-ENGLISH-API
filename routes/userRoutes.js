const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

router.post('/user/signup/:firebaseId', createUser);

router.get('/user/allusers', getUsers);

router.get('/user/:firebaseId', getUser);

router.delete('/user/delete/:firebaseId', deleteUser);

router.put('/user/update/:firebaseId', updateUser);

module.exports = router;
