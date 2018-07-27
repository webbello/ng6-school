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
      creator: '5b56e95df6c3bd0b40ef84f8',//req.decoded.id,
      name: 'GIS',
      description: 'Some des',
      questions: req.body
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
