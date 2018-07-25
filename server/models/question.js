var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionTypeSchema = Schema({
  name: {type: String, required: true},
  isActive: {type: Boolean, required: true}
});

var QuestionChoiceSchema = Schema({
  choice: {type: String, required: true},
  isAnsware: {type: String, required: true}
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