var config = require('../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function verifyToken(req, res, next) {
	console.log('Token:', req.headers['x-access-token']);
  	console.log('Somebody just came to our app');
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	if (token) {
		 jsonwebtoken.verify(token, secretKey, function (err, decoded) {

		 	if (err) {
		 		res.status(403).send({success: false, message: 'failed to authenticate user'});
		 	} else {
		 		req.decoded = decoded;
		 		next();
		 	}
		 });
	} else {
		res.status(403).send({success: false, message: 'No Token Provided'});
	}
}

module.exports = verifyToken;