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
  profilePicture: { type: String },
  position: { type: String },
  summary: { type: String },
  educations: [{ type: Schema.Types.ObjectId, ref: 'Education' }],
  experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
  certifications: [{ type: Schema.Types.ObjectId, ref: 'Certification' }]
}, { collection: 'candidates' });

module.exports = mongoose.model('Candidate', candidateSchema);
