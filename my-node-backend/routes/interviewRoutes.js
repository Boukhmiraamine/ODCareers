const express = require('express');
const { scheduleInterview, respondToInterview, getScheduledInterviewsByRecruiter } = require('../controllers/interviewController');
const { authenticate, checkIfRecruiter, checkIfCandidate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/schedule', scheduleInterview);
router.put('/respond/:interviewId', respondToInterview);
router.get('/recruiter/:recruiterId', getScheduledInterviewsByRecruiter);

module.exports = router;
