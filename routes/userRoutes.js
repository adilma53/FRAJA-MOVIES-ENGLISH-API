const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const {
  addShowToList,
  removeShowFromList,
} = require('../controllers/watchListController');

const {
  addComment,
  deleteComment,
} = require('../controllers/commentController');

const { addFriend, removeFriend } = require('../controllers/friendController');

router.post('/user/signup/:firebaseId', createUser);

router.get('/user/allusers', getUsers);

router.get('/user/:firebaseId', getUser);

router.delete('/user/delete/:firebaseId', deleteUser);

router.put('/user/update/:firebaseId', updateUser);

router.put('/user/:firebaseId/addtolist/:listType', addShowToList);

router.put('/user/:firebaseId/removefromlist/:listType', removeShowFromList);

router.put('/user/:firebaseId/addfriend/:friendFirebaseId', addFriend);

router.put('/user/:firebaseId/removefriend/:friendFirebaseId', removeFriend);

router.put('/user/:firebaseId/addcomment', addComment);

router.put('/user/:firebaseId/deletecomment', deleteComment);

module.exports = router;
