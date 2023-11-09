import express from 'express';
const router = express.Router();

import * as show from '../controllers/showController.js';

router.post('/show/createshow', show.createShow);

router.put('/show/updateshow', show.updateShow);

router.delete('/show/deleteshow', show.deleteShow);

router.get('/show/getallshows', show.getShows);

router.get('/show/getsingleshow', show.getShow);

export default router;
