#!/usr/bin/env node

/**
 * Module dependencies.
 */
var config = require('./config/config');
var app = require('./backend/app');
var debug = require('debug')('sampleexpress:server');
var http = require('http');

var throng = require('throng');

if (!config.isDevelopment) {
  throng({
    workers: config.WORKERS,
    lifetime: Infinity,
    master: function () {
      console.log('Production Server Started.');
    },
    start: startServer
  });
} else {
  console.log('Starting server in debug mode...no cluster');
  startServer();
}

function startServer() {
  /**
   * Get port from environment and store in Express.
  */

  var port = normalizePort(config.express.port);
  //var sslPort = normalizePort(config.express.sslPort);
  
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  var server = http.createServer(app);
//TODO: move these to config file
  //TODO: Enable SSL only
  // var privateKey  = fs.readFileSync('server.key', 'utf8');
  // var certificate = fs.readFileSync('server.crt', 'utf8');
  // var credentials = {key: privateKey, cert: certificate};
  // app.set('port', sslPort);
  // var server2 = https.createServer(credentials, app);
  
  app.set('port', port);
  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  // server2.listen(sslPort);
  // server2.on('error', onError);
  // server2.on('listening', onListening);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}