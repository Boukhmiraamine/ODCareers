const express = require('express');
const router = express.Router();
const jobController = require('../controllers/JobController');
const { logSearchActivity, logViewActivity } = require('../middlewares/activityLogger');
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

// Routes pour la création et gestion des offres d'emploi
router.post('/', jobController.createJob);
router.get('/', logSearchActivity, jobController.getAllJobs); 
router.get('/search', logSearchActivity, jobController.getJobs);
router.get('/unique-search', logSearchActivity, jobController.getJobs); 
router.get('/:id', logViewActivity, jobController.getJobById); 
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.get('/match/:jobId/:candidateId', jobController.matchSkills);
router.post('/:jobId/apply', authenticate, jobController.applyToJob);
router.get('/:jobId/applications', authenticate, checkIfRecruiter, jobController.getApplicationsByJob);
router.put('/applications/:applicationId/status', authenticate, checkIfRecruiter, jobController.updateApplicationStatus);
module.exports = router;
