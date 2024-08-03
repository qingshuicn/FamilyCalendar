const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// POST route to add a new event
router.post('/', eventController.addEvent);

// You can add more routes here if needed, e.g.:
// GET route to fetch all events
// router.get('/', eventController.getAllEvents);

module.exports = router;