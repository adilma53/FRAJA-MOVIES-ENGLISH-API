import express from 'express';
const router = express.Router();

import {
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/commentController.js';

router.post('/user/:firebaseId/addcomment', createComment);

router.put('/user/:firebaseId/updatecomment', updateComment);

router.delete('/user/:firebaseId/deletecomment', deleteComment);

export default router;
