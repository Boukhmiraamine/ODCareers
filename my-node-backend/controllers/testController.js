const Test = require('../models/Test');
const Question = require('../models/Question');
const Result = require('../models/Result');

exports.createTest = async (req, res) => {
    try {
        const newTest = new Test(req.body);
        await newTest.save();
        res.status(201).json(newTest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.takeTest = async (req, res) => {
    const { candidateId, responses } = req.body;
    const testId = req.params.testId;

    try {
        const test = await Test.findById(testId).populate('questions');
        let score = 0;

        const processedAnswers = responses.map(({ questionId, answerOptionId }) => {
            const question = test.questions.find(q => q.id === questionId);
            const answerOption = question.options.id(answerOptionId);
            const isCorrect = answerOption ? answerOption.isCorrect : false;
            if (isCorrect) score += question.points;

            return {
                question: questionId,
                answerOption,
                isCorrect
            };
        });

        const newResult = new Result({
            candidate: candidateId,
            test: testId,
            answers: processedAnswers,
            score,
            completed: true
        });

        await newResult.save();
        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getResults = async (req, res) => {
    const { candidateId } = req.params;

    try {
        const results = await Result.find({ candidate: candidateId }).populate('test');
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
