// var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
var history = require('connect-history-api-fallback');
var compression = require('compression');

var auth = require('./users/auth');
var apiRouter = require('./api-router');
var app = express();



// Middleware to force redirect all to SSL - must pay for heroku for this to work.
// if (!config.isDevelopment && !config.isDebug) {
//   app.use(function(req, res, next) {
//     debugger;
//     if(!req.secure) {
//       //Remove any ports and redirect to base 443 https port:
//       var secureUrl = "https://" + req.headers['host'].split(':')[0] + req.url; 
//       res.writeHead(301, { "Location":  secureUrl });
//       res.end();
//     }
//     next();
//   });
// }
// if (!config.isDevelopment) {
//   app.use(compression());

// }
// *** Make sure that the browser is always handled the URL if it is not an api call
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));

// *** Middleware Setup
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// *** Setup Passport authentication
app.use(passport.initialize());
passport.use(new JWTStrategy(auth.jwtOptions, auth.JWTStrategy));

// **** API Router ****
app.use('/api', apiRouter);

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
  res.status(err.status || 500)
    .json({'status': err.message});
});

module.exports = app;
