const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  addMovieToList,
  removeMovieFromList,
  addFriend,
  removeFriend,
  addComment,
  deleteComment,
} = require('../controllers/userController');

router.post('/user/signup/:firebaseId', createUser);

router.get('/user/allusers', getUsers);

router.get('/user/:firebaseId', getUser);

router.delete('/user/delete/:firebaseId', deleteUser);

router.put('/user/update/:firebaseId', updateUser);

router.put('/user/:firebaseId/addtolist/:listType', addMovieToList);

router.put('/user/:firebaseId/removefromlist/:listType', removeMovieFromList);

router.put('/user/:firebaseId/addfriend/:friendFirebaseId', addFriend);

router.put('/user/:firebaseId/removefriend/:friendFirebaseId', removeFriend);

router.put('/user/:firebaseId/addcomment', addComment);

router.put('/user/:firebaseId/deletecomment', deleteComment);

module.exports = router;
