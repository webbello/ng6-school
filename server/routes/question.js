var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/question.js');
var Quiz = require('../models/quiz.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Question.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
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
  console.log(req.body.choices);
    question = new Question({
      _id: new mongoose.Types.ObjectId(),
      creator: '5b56e95df6c3bd0b40ef84f8',//req.decoded.id,
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
      quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        creator: '5b56e95df6c3bd0b40ef84f8',//req.decoded.id,
        id: 1,
        name: 'GIS',
        description: 'Asp.Net Quiz (contains webform, mvc, web API, etc.)',
        questions: question._id
      });
      quiz.save(function (err) {
        if (err) {
          res.send(err);
          return;
        }
        //res.json({message: 'New Quiz Created'});
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
