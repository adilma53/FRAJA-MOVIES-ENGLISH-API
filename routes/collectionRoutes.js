import express from 'express';
const router = express.Router();

import * as collection from '../controllers/collectionController.js';

router.post('/user/:userId/createcollection', collection.createCollection);

router.delete('/user/:userId/deletecollection', collection.deleteCollection);

router.put(
  '/user/:userId/updateCollection/:updateType',
  collection.updateCollection
);

router.get('/user/:userId/getcollectionshows', collection.getCollectionShows);

router.get('/user/:userId/getusercollections', collection.getUserCollections);

export default router;
