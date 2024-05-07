const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.post('/tests', testController.createTest);
router.post('/tests/:testId/take', testController.takeTest);
router.get('/results/:candidateId', testController.getResults);

module.exports = router;
