var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

//Config
var config = require('./server/config');

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var quizRouter = require('./server/routes/quiz');
var bookRouter = require('./server/routes/book');
var questionRouter = require('./server/routes/question');
// Add your middlewares:
var VerifyToken = require("./server/middleware/VerifyToken");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'server/public')));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //res.setHeader('Access-Control-Allow-Headers', 'X-access-token');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("MongoDB Databse Connected Successfully!");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
// authenticate each request
// will set `request.user`
//app.use(authenticate);
app.use('/quiz', quizRouter);
app.use('/book', bookRouter);
app.use('/question', VerifyToken, questionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
