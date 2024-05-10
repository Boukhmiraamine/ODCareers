// controllers/recruiterController.js
const Recruiter = require('../models/Recruiter');

exports.getLoggedRecruiterDetails = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'Recruiter') {
      return res.status(403).json({ message: "Access denied" });
    }

    const recruiterId = req.user.id;
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json({
      id: recruiter._id,
      username: recruiter.username,
      email: recruiter.email,
      // Add other fields as necessary
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recruiter details", error: error.message });
  }
};
