var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  question: {type: String, required: true},
  type: {type: String, required: true},
  status: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Question', QuestionSchema);