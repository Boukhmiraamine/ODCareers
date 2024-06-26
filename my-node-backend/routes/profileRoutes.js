const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate');
const Recruiter = require('../models/Recruiter'); // Add Recruiter model
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

// Add this route for fetching a candidate profile by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
      .populate('educations')
      .populate('experiences')
      .populate('certifications');
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// Add this route for fetching a recruiter profile by ID
router.get('/recruiter/:id', authenticate, async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

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

router.post('/upload-profile-picture', authenticate, upload, uploadProfilePicture);

module.exports = router;
