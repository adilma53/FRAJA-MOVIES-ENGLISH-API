const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

router.post('/signup/:firebaseId', createUser);

router.get('/allusers', getUsers);

router.get('/:firebaseId', getUser);

router.delete('/delete/:firebaseId', deleteUser);

router.put('/update/:firebaseId', updateUser);

module.exports = router;
