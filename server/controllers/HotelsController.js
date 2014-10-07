var Hotel = require('mongoose').model('Hotel');

function getAllHotels(req, res, next) {
    Hotel.find({}).populate('owner').exec(function (err, collection) {
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
        if (err) {
            console.log('Hotel could not be loaded: ' + err);
            res.status(400).json({message: err});
        }

        res.send(hotel);
    })
}

module.exports = {
    getAllHotels: getAllHotels,
    getHotelById: getHotelById,
    createHotel: createHotel
};