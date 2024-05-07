const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String, enum: ['ROLE_RECRUITER', 'ROLE_CANDIDATE', 'ROLE_ADMIN'], required: true }
});

module.exports = mongoose.model('roles', roleSchema);
