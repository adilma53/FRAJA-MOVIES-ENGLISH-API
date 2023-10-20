const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/userController');

router.post('/add', createUser);

module.exports = router;
