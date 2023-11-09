import express from 'express';
const router = express.Router();

import * as collection from '../controllers/collectionController.js';
// createCollection
router.post('/user/:userId/createcollection', collection.createCollection);

// deleteCollection (use req.query.collectionId)
router.delete('/user/:userId/deletecollection', collection.deleteCollection);

// updateCollection / add remove shows from collection (use req.query.collectionId)
router.put('/user/:userId/updateCollection', collection.updateCollection);

// -----------------------------------------------------

// // getCollectionShows (use req.query.collectionId to filter collectionId=)
router.get('/user/:userId/getcollectionshows', collection.getCollectionShows);

export default router;
