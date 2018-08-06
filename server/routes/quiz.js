var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Quiz = require('../models/quiz.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Quiz.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Quiz.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  console.log(req.body);
    quiz = new Quiz({
      _id: new mongoose.Types.ObjectId(),
      creator: req.decoded.id,
      id: 1,
      name: 'GIS',
      description: 'Asp.Net Quiz (contains webform, mvc, web API, etc.)',
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

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Quiz.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Quiz.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
