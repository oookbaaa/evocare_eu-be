const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const controller = require('./controller');

// Route to get a user by ID
router.get('/user/:id', auth, controller.getUserById);

module.exports = router;
