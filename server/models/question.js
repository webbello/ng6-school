var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionTypeSchema = Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  isActive: {type: Boolean, required: false}
});

var QuestionChoiceSchema = Schema({
  name: {type: String, required: true},
  isAnswer: {type: Boolean, required: false}
});

var QuestionSchema = Schema({
  _id: Schema.Types.ObjectId,
  quiz_id: {type: Schema.Types.ObjectId, ref: 'Quiz'},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  questionTypeId: {type: String, default: 1},
  type: {type: String, required: true, default: 'Multiple Type'},
  questionType: {type: [QuestionTypeSchema]},
  options: {type: [QuestionChoiceSchema], required: true},
  status: {type: String, required: true, default: 'Open'},
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Question', QuestionSchema);