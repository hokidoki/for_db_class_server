var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var valid = require('./routes/account/valid');
var signup = require('./routes/account/signUp');
var signin = require('./routes/account/signIn');
var postArticle = require('./routes/article/postArticle');
var getArticle = require('./routes/article/getArticle');
var search = require('./routes/search/searchUser');
var friendRequest = require('./routes/account/friendRequest');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', valid);
app.use('/',signup);
app.use('/',signin);

app.use('/',postArticle);
app.use('/',getArticle);
app.use('/',search);
app.use('/',friendRequest);

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

app.listen(8000,()=>{
  console.log("hello");
})

module.exports = app;
