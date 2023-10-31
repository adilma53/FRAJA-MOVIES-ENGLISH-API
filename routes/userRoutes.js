import express from 'express';
const router = express.Router();

import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';

import {
  addShowToList,
  removeShowFromList,
} from '../controllers/watchListController.js';

import { addComment, deleteComment } from '../controllers/commentController.js';

import { addFriend, removeFriend } from '../controllers/friendController.js';

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

export default router;
