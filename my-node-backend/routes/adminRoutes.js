const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/users/:userId/:userType/toggle-active', adminController.toggleUserActive);
router.delete('/users/:userId/:userType', adminController.deleteUser);

router.post('/jobs/:jobId/approve', adminController.approveJob);
router.delete('/jobs/:jobId', adminController.deleteJob);

module.exports = router;
