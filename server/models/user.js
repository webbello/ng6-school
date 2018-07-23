var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  email: {type: String, required: true, index: {unique: true}},
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false},
  role: {type: String, default: 'User'},
  status: {type: String, default: 0},
  created: {type: Date, default: Date.now}

});

UserSchema.pre('save', function(next) {
	user = this;
	if (!user.isModified('password')) return next();
	bcrypt.hash(user.password, null, null, function (err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function (password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);