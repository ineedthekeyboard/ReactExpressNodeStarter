var mongoose = require('mongoose');
var config = require('../../config/config');
mongoose.Promise = global.Promise;
var db = mongoose.connect(config.mongodb.uri);

module.exports = db;