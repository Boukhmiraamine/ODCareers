// routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
//const auth = require('../middleware/auth'); // Ensure you have authentication middleware

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

router.get('/me', authenticate, recruiterController.getLoggedRecruiterDetails);

module.exports = router;
