var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuizSchema = Schema({
	_id: Schema.Types.ObjectId,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  courseId: {type: Number, required: true},
  name: {type: String, required: true},
  description: {type: String, required: false},
  questionId: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  questions: [],
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Quiz', QuizSchema);