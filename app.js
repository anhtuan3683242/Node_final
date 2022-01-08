var createError = require('http-errors');
var express = require('express');
var path = require('path');
const passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var secret = require('./secret.js')
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var handlebars = require('express3-handlebars').create({
  defaultLayout: 'main'
})
var app = express();

// view engine setup

//app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser(secret.cookieSecret));

app.use(require("express-session")(secret.sessionSecret));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./services/passport');

app.use(passport.initialize());
app.use(passport.session());
handlebars.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res) => {
  res.status(404)
  res.end("Đường dẫn không hợp lệ")
})
app.get('/getcookie', (req, res) => {
  //show the saved cookies
  console.log(req.cookies)
  res.send(req.cookies);
});

var mongoconnect = require('./mongoDB/mongoconnect');
mongoconnect.connectDB();


app.use((req,res,next)=>{
  res.locals.flash = req.session.flash
  delete req.session.flash
  next();
})

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
