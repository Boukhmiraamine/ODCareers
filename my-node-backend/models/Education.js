const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  skills: [{ type: String }]
});

module.exports = mongoose.model('Education', educationSchema);
