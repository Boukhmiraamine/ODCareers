const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  skills: [{ type: String }]
});

module.exports = mongoose.model('Experience', experienceSchema);
