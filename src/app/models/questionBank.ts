const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (v: string[]) {
        return v.length >= 2; // Ensure at least two options
      },
      message: 'A question must have at least two options.',
    },
  },
  correctAnswer: {
    type: String,
    required: true,
    enum: {
      values: ['a', 'b', 'c', 'd'],
      message: 'Correct answer must be one of the options (a, b, c, or d).',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
