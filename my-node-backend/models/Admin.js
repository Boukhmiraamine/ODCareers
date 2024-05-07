const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, maxlength: 120 }
}, { collection: 'admins' });

module.exports = mongoose.model('Admin', adminSchema);
