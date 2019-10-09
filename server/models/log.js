var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = Schema({
	_id: Schema.Types.ObjectId,
  // user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  // user_id: {type: String, required: true},
  // player_id: {type: String, required: true},
  // player_id: {type: Schema.Types.ObjectId, ref: 'User'},
  from: {},
  course_id: {type: String, required: true},
  quiz_id: {type: Schema.Types.ObjectId, ref: 'Quiz'},
  correctAnswerCount: {type: String, required: false},
  questions: [],
  answers: [],
  // quiz_by: {type: Schema.Types.ObjectId, ref: 'User'},
  quiz_by: {type: String, required: false},
  created_at: {type: Date, default: Date.now}
  // played_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Log', LogSchema);