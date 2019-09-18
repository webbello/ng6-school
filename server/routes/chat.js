var express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var Chat = require('../models/chat.js');
var io = require('socket.io')(http);

//Config
var config = require('./../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log('Connected client on Rout Chat - port %s.', 3000);
  res.render('index', { title: 'IIRS BACKEND API - CHAT' });

});

/* GET ALL LOGS By Date and Course Id*/
router.get('/:lectureId/:courseId?', function(req, res, next) {
  let query = { 
    lecture_id: req.params.lectureId,
    course_id: req.params.courseId
  };

  Chat.findOne(query, function (err, reports) {
    if (err) return next(err);
    res.json(reports);
    //console.log(reports);
  });
});

module.exports = router;