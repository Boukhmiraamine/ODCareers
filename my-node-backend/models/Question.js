const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});

const questionSchema = new Schema({
    text: { type: String, required: true },
    options: [optionSchema],
    points: { type: Number, required: true }
});

module.exports = mongoose.model('Question', questionSchema);
