var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = Schema({
    // _id: Schema.Types.ObjectId,
  // user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  // user_id: {type: String, required: true},
  lecture_id: {type: String, required: true},
  // player_id: {type: Schema.Types.ObjectId, ref: 'User'},
  course_id: {type: String, required: true},
  message: [],

  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', ChatSchema);