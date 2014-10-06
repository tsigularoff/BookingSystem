var mongoose = require('mongoose');
var mongoose = require('./Room');

var hotelSchema = mongoose.Schema({
    name: String,
    description: String,
    star_rating: Integer,
    address: String,
    city: String,
    rooms: [Room]
});

var Hotel = mongoose.model('Hotel', hotelSchema);

module.exports.seedInitialHotels = function () {
    Hotel.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find hotels: ' + err);
            return;
        }

        if (collection.length === 0) {
//            Hotel.create({});
        }
    });
};