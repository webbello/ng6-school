var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Log = require('../models/log.js');
/* GET ALL LOGS */
router.get('/', function(req, res, next) {
  Log.find(function (err, logs) {
    if (err) return next(err);
    res.json(logs);
  });
});

/* GET ALL LOGS By Date and Course Id*/
router.get('/reports/:date/:courseId', function(req, res, next) {
  var query = { played_at: new Date(req.params.date), course_id: req.params.courseId };
  Log.find(query, function (err, reports) {
    if (err) return next(err);
    res.json(reports);
  });
});

/* GET SINGLE LOG BY ID */
router.get('/:id', function(req, res, next) {
  Log.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* Log Log */
router.post('/', function(req, res, next) {
  console.log('req.decoded', req.decoded);
  console.log('req.body', req.body);
    log = new Log({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.decoded.user_id,
      player_id: req.body.from.userId,
      course_id: req.body.courseId,
      quiz_id: req.body.id,
      marks: req.body.correctAnswerCount,
      answered: req.body.answers,
      quiz_by: req.body.quiz_by
    });
    log.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'New Quiz Log Created'});
    });
});

/* UPDATE LOG */
router.put('/:id', function(req, res, next) {
  Log.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE LOG */
router.delete('/:id', function(req, res, next) {
  Log.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
