var Hotel = require('mongoose').model('Hotel');
var validators = require('../utilities/validators');

var ALLOWED_SORT_HOTELS = ['name']; //TODO: Fill
var ITEMS_LIMIT = 10;

function getAllHotels(req, res, next) {

    var page = validators.validatePage(req.query.page);
    var sortBy = validators.validateSort(req.query.sortBy, ALLOWED_SORT_HOTELS);

    Hotel.find({}).skip((page - 1) * ITEMS_LIMIT).limit(ITEMS_LIMIT).populate('owner').exec(function (err, collection) {
        if (err) {
            throw "Hotels could not be loaded" + err;
        }

        res.send(collection);
    })
}
function createHotel(req, res, next) {
    var hotel = new Hotel(req.body);
    hotel.owner = req.user;

    hotel.save(function (err) {
        if (err) {
            res.status(400).json({message: err});
        }
        res.json(hotel);
    });
}

function getHotelById(req, res, next) {
    Hotel.findOne({_id: req.params.id}).populate('owner').exec(function (err, hotel) {
        if (err || !hotel) {
            console.log('Hotel could not be loaded: ' + err);
            res.status(400).json({message: err});
        }

        res.send(hotel);
    })
}

function getAvailableHotels(req, res, next) {
    var page = validators.validatePage(req.query.page),
        sortBy = validators.validateSort(req.query.sortBy, ALLOWED_SORT_HOTELS),
        star_rating = req.query.star_rating || 1,
        city = req.query.city || /.+/,
        room_type = req.query.room_type || /.+/,
        room_max_occupancy = req.query.room_max_occupancy || 1,
        price = req.query.price || 1;

    Hotel.find({})
        .where('star_rating').gte(star_rating)
        .where({city: city})
        .where('rooms.room_max_occupancy').gte(room_max_occupancy)
        .where('rooms.price').gte(price)
        .where({'rooms.room_type': room_type})
        .populate('owner').exec(function (err, hotels) {
            if (err) {
                throw "Hotels could not be loaded" + err;
            }
            var availableHotels = [];
            for (var i = 0; i < hotels.length; i++) {
                var hotel = hotels[i];
                var isAvailable = true;
                for (var j = 0; j < hotel.rooms.length; j++) {
                    var bookings = hotel.rooms[j].bookings;
                    for (var k = 0; k < bookings.length; k++) {
                        var bookingFromDate = new Date(bookings[k].fromDate);
                        var bookingToDate = new Date(bookings[k].toDate);
                        var reqFromDate = new Date(req.query.fromDate);
                        var reqToDate = new Date(req.query.toDate);
                        if (reqToDate <= reqFromDate) {
                            return res.status(400).json({message: 'Departure date must be after the arrival date!'});
                        }
                        if (bookingFromDate < reqToDate && reqFromDate < bookingToDate) {
                            isAvailable = false;
                            break;
                        }
                    }
                }
                if (isAvailable) {
                    availableHotels.push(hotel);
                }
            }
            res.send(availableHotels);
        });
}

function deleteHotel(req, res, next) {
    Hotel.findOne({_id: req.params.id}).exec(function (err, hotel) {
        if (err || !hotel) {
            console.log('Hotel could not be deleted: ' + err);
            res.status(400).json({message: err});
        }
        else if (req.user._id === hotel.owner._id || req.user.roles.indexOf('admin') > -1) {

            hotel.remove(function () {
                res.status(200).json({message: 'Hotel deleted!'});
            });
        }
        else {
            res.status(400).json({message: 'You do not have permissions!'});
        }
    });
}

module.exports = {
    getAllHotels: getAllHotels,
    getHotelById: getHotelById,
    createHotel: createHotel,
    deleteHotel: deleteHotel,
    getAvailableHotels: getAvailableHotels
};