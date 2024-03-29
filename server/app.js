var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require('./firebase-init');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/task');
var submitRouter = require('./routes/submit');

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/task', taskRouter);
app.use('/submit', submitRouter);

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

var processLogin = function (req, res, next) {
  if (req.params.idToken) {
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      req.firebaseID = decodedToken.uid;;
    }).catch(function(error) {
      delete req.firebaseID;
    });
  }
}

app.use(processLogin)

module.exports = app;
