const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    //answerOption: optionSchema,
    isCorrect: { type: Boolean, required: true }
});

const resultSchema = new Schema({
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate' },
    test: { type: Schema.Types.ObjectId, ref: 'Test' },
    answers: [answerSchema],
    score: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    dateTaken: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
