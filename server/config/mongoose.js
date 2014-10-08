var mongoose = require('mongoose'),
    user = require('../models/User'),
    room = require('../models/Room'),
    booking = require('../models/Booking'),
    hotel = require('../models/Hotel');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function (err) {
        console.log('Database error: ' + err);
    });

    user.seedInitialUsers();
    hotel.seedInitialHotels();
};