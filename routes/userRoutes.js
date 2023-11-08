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

import { addFriend, removeFriend } from '../controllers/friendController.js';

router.post('/user/signup/:userId', createUser);

router.get('/user/allusers', getUsers);

router.get('/user/:userId', getUser);

router.delete('/user/delete/:userId', deleteUser);

router.put('/user/update/:userId', updateUser);
// -------------------------
router.put('/user/:userId/addtolist/:listType', addShowToList);

router.put('/user/:userId/removefromlist/:listType', removeShowFromList);
// -------------------------
router.put('/user/:userId/addfriend/:friendId', addFriend);

router.put('/user/:userId/removefriend/:friendId', removeFriend);

export default router;
