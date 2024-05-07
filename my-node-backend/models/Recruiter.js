const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
  username: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, maxlength: 120 },
  companyName: { type: String, required: true },
  bio: { type: String, required: true },
  activitySector: { type: String, required: true },
  addressCompany: { type: String, required: true },
  companyEmail: { type: String, required: true, unique: true },
  companyPhoneNumber: { type: String, required: true },
  companyLogo: { type: String, required: true },
  recruiterFullName: { type: String, required: true },
  recruiterProfessionalTitle: { type: String, required: true }
}, { collection: 'recruiters' });

module.exports = mongoose.model('Recruiter', recruiterSchema);
