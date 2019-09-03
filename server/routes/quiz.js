var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Quiz = require('../models/quiz.js');

/* GET ALL QUIZ */
router.get('/', function(req, res, next) {
  Quiz.find({}, null, {sort: '-created'}, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE QUIZ BY ID */
router.get('/:id', function(req, res, next) {
  Quiz.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE QUIZ BY COURSE ID */
router.get('/course/:id', function(req, res, next) {
  Quiz.find({courseId: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE QUIZ */
router.post('/', function(req, res, next) {
  console.log(req.body);
    quiz = new Quiz({
      _id: new mongoose.Types.ObjectId(),
      creator: req.decoded.id,
      courseId: req.body.course,
      name: req.body.name,
      description: req.body.description,
      questionId: [],
      questions: [],
    });
    quiz.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({message: 'New Quiz Created'});
    });
});

/* UPDATE QUIZ */
router.put('/:id', function(req, res, next) {
  Quiz.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE QUIZ */
router.delete('/:id', function(req, res, next) {
  Quiz.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
