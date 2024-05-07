const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  recipientType: { type: String, enum: ['Candidate', 'Recruiter'], required: true },
  recipient: { type: Schema.Types.ObjectId, refPath: 'recipientType' },
  senderType: { type: String, enum: ['Candidate', 'Recruiter'], required: true },
  sender: { type: Schema.Types.ObjectId, refPath: 'senderType' },
  message: { type: String, required: true },
  link: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
