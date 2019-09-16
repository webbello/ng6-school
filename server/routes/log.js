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
router.get('/reports/:date/:courseId?', function(req, res, next) {
  let d = new Date(req.params.date);
  let start = new Date(d.getFullYear(),d.getMonth(),d.getDate());
  let end = new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);

  console.log('start', start);
  console.log('end', end);
  console.log('courseId', req.params.courseId);
  var query = { 
    "played_at": {"$gte": start, "$lte": end},
    course_id: req.params.courseId };

  if (req.params.courseId == undefined || req.params.courseId === 'Any') {
    query = { 
      "played_at": {"$gte": start, "$lte": end} 
    };
  }
  
  Log.find(query, function (err, reports) {
    if (err) return next(err);
    res.json(reports);
    //console.log(reports);
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
