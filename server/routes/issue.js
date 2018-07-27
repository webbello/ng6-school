var express = require('express');
var router = express.Router();

var Issue = require('../models/issue');

/* GET Issue listing. */
router.get('/', function(req, res, next) {

	Issue.find((err, issues) => {
		if (err) {
			console.log(err);

		} else {
			res.json(issues);
		}
	});
  //res.send('respond with a resource');
});

/* GET one issue listing. */
router.get('/:id', function(req, res, next) {

	Issue.findById(req.params.id, (err, issue) => {
		if (err) {
			console.log(err);

		} else {
			res.json(issue);
		}
	})
  res.send('respond update with a resource');
});

router.route('/add').post((req, res) => {
    var issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.route('/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

module.exports = router;
