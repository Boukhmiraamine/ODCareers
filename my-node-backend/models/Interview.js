// models/Interview.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  recruiter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rescheduled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
