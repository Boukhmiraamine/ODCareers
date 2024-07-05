const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const Recruiter = require('../models/Recruiter');
const Candidate = require('../models/Candidate');
const Admin = require('../models/Admin');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single('companyLogo');

exports.signup = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    const { userType, username, email, password, recruiterFullName, recruiterProfessionalTitle, companyName, bio, activitySector, addressCompany, companyEmail, companyPhoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let Model;

    switch (userType) {
      case 'Recruiter':
        Model = Recruiter;
        break;
      case 'Candidate':
        Model = Candidate;
        break;
      case 'Admin':
        Model = Admin;
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    try {
      const newUser = new Model({
        username,
        email,
        password: hashedPassword,
        recruiterFullName,
        recruiterProfessionalTitle,
        companyName,
        bio,
        activitySector,
        addressCompany,
        companyEmail,
        companyPhoneNumber,
        companyLogo: req.file ? req.file.path : ''
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully!", userType: userType });
    } catch (error) {
      res.status(500).json({ message: "Failed to register user", error: error.message });
    }
  });
};

exports.signin = async (req, res) => {
  const { username, password, mfaCode } = req.body;

  let user = await Recruiter.findOne({ username }) || await Candidate.findOne({ username }) || await Admin.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  let userType;
  if (user instanceof Recruiter) {
    userType = 'Recruiter';
  } else if (user instanceof Candidate) {
    userType = 'Candidate';
  } else if (user instanceof Admin) {
    userType = 'Admin';
  }

  // Check for MFA requirement
  if (user.mfaEnabled && !mfaCode) {
    return res.json({ mfaRequired: true });
  } else if (user.mfaEnabled && mfaCode) {
    const isMfaCodeValid = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: mfaCode
    });
    if (!isMfaCodeValid) {
      return res.status(401).json({ message: "Invalid MFA code" });
    }
  }

  const payload = {
    user: {
      id: user.id,
      role: userType
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token: `Bearer ${token}`, user: { id: user.id, username: user.username, role: userType } });
    }
  );
};