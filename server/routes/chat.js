var express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var io = require('socket.io')(http);

//Config
var config = require('./../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IIRS BACKEND API' });
});

io.on('connection', function (socket) {
	console.log('conected');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = router;