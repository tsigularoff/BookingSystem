var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/bookingsystem',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://bookingadmin:bookingpass@ds033400.mongolab.com:33400/bookingsystem',
        port: process.env.PORT || 3030
    },
    test: {
        rootPath: rootPath,
        db: 'mongodb://localhost/bookingsystemtest',
        port: process.env.PORT || 3030
    }
};