const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Certification = require('../models/Certification');
const Candidate = require('../models/Candidate');


async function addEducation(req, res) {
  try {
    const newEducation = new Education({ ...req.body, candidate: req.user.id });
    await newEducation.save();
    res.status(201).json(newEducation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add education', error: error.message });
  }
}

async function updateEducation(req, res) {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update education', error: error.message });
  }
}

async function deleteEducation(req, res) {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete education', error: error.message });
  }
}

async function addExperience(req, res) {
  try {
    const newExperience = new Experience({ ...req.body, candidate: req.user.id });
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add experience', error: error.message });
  }
}

async function updateExperience(req, res) {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update experience', error: error.message });
  }
}

async function deleteExperience(req, res) {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete experience', error: error.message });
  }
}

async function addCertification(req, res) {
  try {
    const newCertification = new Certification({ ...req.body, candidate: req.user.id });
    await newCertification.save();
    res.status(201).json(newCertification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add certification', error: error.message });
  }
}

async function updateCertification(req, res) {
  try {
    const updatedCertification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCertification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update certification', error: error.message });
  }
}

async function deleteCertification(req, res) {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete certification', error: error.message });
  }
}

async function updatePersonalInfo(req, res) {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update personal info', error: error.message });
  }
}

module.exports = {
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  addCertification,
  updateCertification,
  deleteCertification,
  updatePersonalInfo
};
