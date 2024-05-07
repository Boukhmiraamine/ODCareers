const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOptions = { discriminatorKey: 'userType', collection: 'users' };
const userSchema = new Schema({
  username: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, maxlength: 120 }
}, userOptions);

const User = mongoose.model('User', userSchema);

const recruiterSchema = new Schema({
  companyName: { type: String, required: true },
  bio: { type: String, required: true },
  activitySector: { type: String, required: true },
  addressCompany: { type: String, required: true },
  companyEmail: { type: String, required: true, unique: true },
  companyPhoneNumber: { type: String, required: true },
  companyLogo: { type: String, required: true },
  recruiterFullName: { type: String, required: true },
  recruiterProfessionalTitle: { type: String, required: true }
});

const candidateSchema = new Schema({
  fullName: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  age: { type: Number, required: true },
  niveauEtudes: { type: String, required: true },
  domaineEtudes: { type: String, required: true },
  titreDiplomeCertification: { type: String, required: true },
  description: { type: String, required: true }
});

User.discriminator('Recruiter', recruiterSchema);
User.discriminator('Candidate', candidateSchema);

module.exports = User;
