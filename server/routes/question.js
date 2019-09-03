var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/question.js');
var Quiz = require('../models/quiz.js');

/* GET ALL Questions */
router.get('/', function(req, res, next) {
  Question.find({}, null, {sort: '-created'}, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Question.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  //console.log('Irfan Adeeb', req.body.quiz);
    question = new Question({
      _id: new mongoose.Types.ObjectId(),
      quiz_id: req.body.quiz,
      creator: req.decoded.id,
      name: req.body.question,
      questionTypeId: 1,
      type: req.body.type,
      options: req.body.choices,
      questionType: {
        "id": 1,
        "name": "Multiple Choice",
        "isActive": true
      },
      status: req.body.status
    });
    question.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      Quiz.update(
         { _id: req.body.quiz },
         { $addToSet: {questionId: [ question._id ] , questions: [ question ] } }
      ).then(user => {
          res.json('Update done');
      }).catch(err => {
          res.status(400).send('Update failed');
      });
      res.json({message: 'New Question Created'});
    });
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Question.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Question.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
