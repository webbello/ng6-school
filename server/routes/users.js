var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Story = require('../models/story');

var config = require('../config');
var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');
// Add your middlewares:
var VerifyToken = require("../middleware/VerifyToken");

function createToken(user) {
 	var token = jsonwebtoken.sign({
 		id: user._id,
 		name: user.name,
 		username: user.username,
 		role: user.role
 	}, secretKey, {
 		expiresIn: '1h'
 	});
 	return token;
}


/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find((err, users) => {
		if (err) {
			console.log(err);

		} else {
			res.json(users);
		}
	});
	//res.json({message: 'All users'})
  
});

/* Signup. */
router.post('/signup', function(req, res, next) {
	console.log(req.body);
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	user.save(function (err) {
		if (err) { res.send(err);
			return;
		}
		res.json({success: true, message: 'User has been added successfully!'})

	});
  
});

router.route('/login').post((req, res) => {
    User.findOne({username: req.body.username}).select('password').exec(function (err, user) {
    	if (err) throw err;
    	if (!user) {
    		res.send({message: 'User Doesnt exit'});
    	} else if (user) {
    		var validPassword = user.comparePassword(req.body.password);
    		if (!validPassword) {
    			res.json({message: 'Invalid password'});
    		} else {
    			var token = createToken(user);
    			res.status(200).json({
    				success: true,
    				message: 'Successfully Login!',
    				token: token,
    				expiresIn: '12'
    			})
    		}
    	}
    });
});

// Middelware to check login user
// router.use(function (req, res, next) {
// 	console.log('Somebody just came to our app');
// 	var token = req.body.token || req.params.token || req.headers['x-access-token'];
// 	if (token) {
// 		 jsonwebtoken.verify(token, secretKey, function (err, decoded) {

// 		 	if (err) {
// 		 		res.status(403).send({success: false, message: 'failed to authenticate user'});
// 		 	} else {
// 		 		req.decoded = decoded;
// 		 		next();
// 		 	}
// 		 });
// 	} else {
// 		res.status(403).send({success: false, message: 'No Token Provided'});
// 	}
// });

/* Add User. */
router.post('/add', function(req, res, next) {
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	user.save(function (err) {
		if (err) { res.send(err);
			return;
		}
		res.json({message: 'User has been added successfully!'})

	});
  
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (!user)
            return next(new Error('Could not load document'));
        else {
            user.title = req.body.title;
            user.email = req.body.email;
            user.username = req.body.username;
            user.password = req.body.password;
            user.status = req.body.status;

            user.save().then(user => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/delete/:id').get((req, res) => {
    User.findByIdAndRemove({_id: req.params.id}, (err, quiz) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
});


router.route('/story')
	.post(function (req, res) {
		story = new Story({
			creator: req.decoded.id,
			content: req.body.content
		});
		story.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
			res.json({message: 'New Story Created'});
		});
	})

	.get(function (req, res) {
		Story.find({creator: req.decoded.id}, function (err, stories) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(stories);
		});
	});

router.get('/me', VerifyToken, function(req, res, next) {

	res.json(req.decoded);
  
});

/* GET SINGLE Logged in user BY ID */
router.get('/loggedin', VerifyToken, function(req, res, next) {
  User.findById(req.decoded.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;
