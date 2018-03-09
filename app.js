var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var debug = require('debug')('sampleexpress:server');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var authentication = require('./backend/authentication');
var history = require('connect-history-api-fallback');

//Routers
var users = require('./backend/routes/users');
var register = require('./backend/routes/register');
var login = require('./backend/routes/login');

var app = express();
var isDevelopment = process.env.NODE_ENV !== "production";

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setup Sessions for passport to bolt onto
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
  // cookie: { secure: true } for ssl only - enable for production
}));
//Bolt passport sessions to express sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));

//Setup Passport authentication
passport.use(new LocalStrategy(authentication.basicAuthStrategey));
passport.serializeUser(authentication.serializeSession);
passport.deserializeUser(authentication.deSerializeSession);

// Application Routes
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', index);
app.use('/api', users);
// app.use('/login', login);
// app.use('/register', register);

//********* 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;
