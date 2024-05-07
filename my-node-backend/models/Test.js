const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    duration: { type: Number } 
});

module.exports = mongoose.model('Test', testSchema);
