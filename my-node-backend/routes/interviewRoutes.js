const express = require('express');
const { scheduleInterview, respondToInterview } = require('../controllers/interviewController');
const { authenticate, checkIfRecruiter, checkIfCandidate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/schedule', scheduleInterview);
router.put('/respond/:interviewId', respondToInterview);

module.exports = router;
