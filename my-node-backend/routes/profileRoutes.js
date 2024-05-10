/*const express = require('express');
const router = express.Router();
//const { authenticate } = require('../middlewares/authMiddleware');
const { addEducation, addExperience, addCertification } = require('../controllers/profileController');
function authenticate (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication failed: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed: Invalid token" });
    }
};
router.post('/education', addEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

router.post('/experience', addExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

router.post('/certification', addCertification);
router.put('/certification/:id', updateCertification);
router.delete('/certification/:id', deleteCertification);

router.put('/personal-info', updatePersonalInfo);

module.exports = router;*/
