// routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const auth = require('../middleware/auth'); // Ensure you have authentication middleware

router.get('/me', auth.authenticate, recruiterController.getLoggedRecruiterDetails);

module.exports = router;
