var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var valid = require('./routes/account/valid');
var signup = require('./routes/account/signUp');
var signin = require('./routes/account/signIn');
var postArticle = require('./routes/article/postArticle');
var getArticle = require('./routes/article/getArticle');
var puArticle = require('./routes/article/putArticle');
var search = require('./routes/search/searchUser');
var friendRequest = require('./routes/account/friendRequest');
var groupAdmin = require('./routes/group/createGroup');
var user = require('./routes/account/user');
var message = require('./routes/message/message');
var group = require('./routes/group/group');
var groupMessage = require('./routes/group/groupMessage')
var groupArticle = require('./routes/group/groupArticle');
var public = require('./routes/public/data');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',public);
app.use('/', indexRouter);
app.use('/', valid);
app.use('/', user);
app.use('/',signup);
app.use('/',signin);

app.use('/',postArticle);
app.use('/',getArticle);
app.use('/',puArticle);
app.use('/',search);
app.use('/',friendRequest);
app.use('/',message);

app.use('/',groupAdmin)
app.use('/',group);
app.use('/',groupMessage)
app.use('/',groupArticle);
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
