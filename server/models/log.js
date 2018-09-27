var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = Schema({
	_id: Schema.Types.ObjectId,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  player_id: {type: Schema.Types.ObjectId, ref: 'User'},
  quiz_id: {type: Schema.Types.ObjectId, ref: 'Quiz'},
  marks: {type: String, required: false},
  answered: [],
  quiz_by: {type: Schema.Types.ObjectId, ref: 'User'},
  played_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Log', LogSchema);