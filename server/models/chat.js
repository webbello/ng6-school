var mongoose = require('mongoose');
var User = require('../models/user');

var Schema = mongoose.Schema;

var MessageTypeSchema = Schema({
  _id: Schema.Types.ObjectId,
  from: {},
  content: {type: String, required: true},
  parent_id: {type: Schema.Types.ObjectId},
  parent_message: {},
  created_at: {type: Date, default: Date.now}
});

var ChatSchema = Schema({
    // _id: Schema.Types.ObjectId,
  // user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  // user_id: {type: String, required: true},
  lecture_id: {type: String, required: true},
  // player_id: {type: Schema.Types.ObjectId, ref: 'User'},
  course_id: {type: String, required: true},
  //message: [],
  message: {type: [MessageTypeSchema]},

  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', ChatSchema);