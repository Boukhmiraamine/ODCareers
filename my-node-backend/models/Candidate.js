/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  username: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, maxlength: 120 },
  fullName: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  age: { type: Number, required: true },
  niveauEtudes: { type: String, required: true },
  domaineEtudes: { type: String, required: true },
  titreDiplomeCertification: { type: String, required: true },
  description: { type: String, required: true }
}, { collection: 'candidates' });

module.exports = mongoose.model('Candidate', candidateSchema);*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  username: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, maxlength: 120 },
  fullName: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  age: { type: Number, required: true },
  educations: [{ type: Schema.Types.ObjectId, ref: 'Education', required: false }],
  experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience', required: false }],
  certifications: [{ type: Schema.Types.ObjectId, ref: 'Certification', required: false }]
}, { collection: 'candidates' });

module.exports = mongoose.model('Candidate', candidateSchema);

