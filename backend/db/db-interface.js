var mongoose = require('mongoose');
var config = require('./schema/index');
var dbConnector = require('./db-connector');

mongoose.Promise = global.Promise;

let DatabaseInterface = function () {
    //Setup Schema
    this.userConnection = mongoose.Schema(config.userSchema.schema);
    this.userConnection.statics = Object.assign(this.userConnection.statics, config.userSchema.statics);

    //Make Connection to DB
    this.users = mongoose.model('user', this.userConnection);
};
module.exports = new DatabaseInterface;