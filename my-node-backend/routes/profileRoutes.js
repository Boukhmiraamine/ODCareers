const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  addCertification,
  updateCertification,
  deleteCertification,
  updatePersonalInfo,
  upload,
  uploadProfilePicture
} = require('../controllers/profileController');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
}

router.post('/education', authenticate, addEducation);
router.put('/education/:id', authenticate, updateEducation);
router.delete('/education/:id', authenticate, deleteEducation);

router.post('/experience', authenticate, addExperience);
router.put('/experience/:id', authenticate, updateExperience);
router.delete('/experience/:id', authenticate, deleteExperience);

router.post('/certification', authenticate, addCertification);
router.put('/certification/:id', authenticate, updateCertification);
router.delete('/certification/:id', authenticate, deleteCertification);

router.put('/personal-info', authenticate, updatePersonalInfo);

router.post('/upload-profile-picture', authenticate, upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;
