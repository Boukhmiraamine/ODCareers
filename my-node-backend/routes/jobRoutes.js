const express = require('express');
const router = express.Router();
const jobController = require('../controllers/JobController');
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        req.candidate = { candidateId: decoded.user.id };
        next();
    } catch (e) {
        res.status(401).json({ message: "Token is not valid" });
    }
}

function checkIfRecruiter(req, res, next) {
    if (req.user && req.user.role === 'Recruiter') {
        next();
    } else {
        res.status(403).json({ message: "Access denied" });
    }
}

router.post('/', authenticate, checkIfRecruiter, jobController.createJob);
router.get('/', authenticate, jobController.getAllJobs);
router.get('/byRecruiter', authenticate, jobController.getJobsByRecruiter);
router.get('/search', authenticate, jobController.getJobs);
router.get('/:id', authenticate, jobController.getJobById);
router.put('/:id', authenticate, checkIfRecruiter, jobController.updateJob);
router.delete('/:id', authenticate, checkIfRecruiter, jobController.deleteJob);
router.post('/:jobId/apply', authenticate, jobController.applyToJob);
router.get('/:jobId/applications', authenticate, checkIfRecruiter, jobController.getApplicationsByJob);
router.put('/:jobId/applications/:candidateId/status', authenticate, checkIfRecruiter, jobController.updateApplicationStatus);

module.exports = router;
