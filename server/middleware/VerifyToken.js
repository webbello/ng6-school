var config = require('../config');
var secretKey = config.secretKey;
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	console.log('Token:', req.headers);
  	console.log('Somebody just came to our app');
  	if (!req.headers.authorization) {
  		return res.status(401).send('Unauthorized request');
  	}
	//var token = req.body.token || req.params.token || req.headers.authorization;
	var token = req.headers.authorization.split(' ')[1];
	if (token === 'null') {
  		return res.status(401).send('Unauthorized request');
  	}

  	var payload = jwt.verify(token, secretKey)
  	if (!payload) {
  		return res.status(401).send('Unauthorized request');
  	}
  	//req.userId = payload.subject;
  	req.decoded = payload;
  	next();

	// if (token) {
	// 	 jwt.verify(token, secretKey, function (err, decoded) {

	// 	 	if (err) {
	// 	 		res.status(403).send({success: false, message: 'failed to authenticate user'});
	// 	 	} else {
	// 	 		req.decoded = decoded;
	// 	 		next();
	// 	 	}
	// 	 });
	// } else {
	// 	res.status(403).send({success: false, message: 'No Token Provided'});
	// }
}

module.exports = verifyToken;