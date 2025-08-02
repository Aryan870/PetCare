const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Send a message
router.post('/send', chatController.sendMessage);

// Get messages for a particular appointment
router.get('/:appointmentId', chatController.getMessages);

module.exports = router;
