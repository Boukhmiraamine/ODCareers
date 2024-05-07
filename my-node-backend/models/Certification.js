const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificationSchema = new Schema({
  candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  dateObtained: { type: Date, required: true },
  skills: [{ type: String }]
});

module.exports = mongoose.model('Certification', certificationSchema);
