const Recruiter = require('../models/Recruiter');
const Candidate = require('../models/Candidate');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { userType, username, email, password, fullName, status, address, telephone, age } = req.body;
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
      fullName,
      status,
      address,
      telephone,
      age
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", userType: userType });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

exports.signin = async (req, res) => {
  const { userType, username, password } = req.body;
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
    const user = await Model.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
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

  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
