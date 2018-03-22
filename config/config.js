var config = module.exports
var PRODUCTION = process.env.NODE_ENV === 'production'

config.secretJWTKey = '7[T{!*\=k^J(y^gC';
config.isDevelopment = !PRODUCTION;

config.WORKERS = process.env.WEB_CONCURRENCY || 1;
config.express = {
    sslPort: 443,
    port: process.env.PORT || 3500,
    ip: process.env.IP || '127.0.0.1'
}

config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    db: process.env.MONGODB_DB || 'reactFSStarter',
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/reactFSStarter'
}
if (PRODUCTION) {
    config.express.ip = '0.0.0.0'
    config.mongodb = {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/reactFSStarter'
    }
}