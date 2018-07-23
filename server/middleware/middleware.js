var config = require('../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

module.exports = {
    auth: function (req, res, next) {
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
	};
}