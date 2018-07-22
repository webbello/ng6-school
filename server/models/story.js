var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  content: {type: String, required: true},
  created: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Story', StorySchema);