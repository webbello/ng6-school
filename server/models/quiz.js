var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuizSchema = Schema({
	_id: Schema.Types.ObjectId,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, default: 'GIS'},
  description: {type: String, required: false},
  questions: [],
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Quiz', QuizSchema);