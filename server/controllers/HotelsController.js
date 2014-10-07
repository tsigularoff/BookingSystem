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
    deleteHotel: deleteHotel
};