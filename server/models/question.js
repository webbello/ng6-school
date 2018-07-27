var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionTypeSchema = Schema({
  name: {type: String, required: true},
  isActive: {type: Boolean, required: false}
});

var QuestionChoiceSchema = Schema({
  option: {type: String, required: true},
  isRightAnswer: {type: String, required: false}
});

var QuestionSchema = Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  description: {type: String, required: true},
  question: {type: String, required: true},
  type: {type: String, required: true},
  options:{type: [QuestionChoiceSchema], required: true},
  status: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Question', QuestionSchema);