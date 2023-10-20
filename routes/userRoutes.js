const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/userController');

router.post('/signup/:firebaseId', createUser);

module.exports = router;
