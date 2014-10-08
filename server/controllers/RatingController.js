var Hotel = require('mongoose').model('Hotel');
var User = require('mongoose').model('User');

function rateHotel(req, res, next) {
    var rateData = req.body;

    Hotel.findOne({_id : rateData.hotelId}, function (err, hotel) {
        if(err){
            err;
        }

        hotel.star_rating += rateData.rate;

        hotel.save(function (err, hotel) {
            if(err){
                err;
            }
            res.send({star_rating: hotel.star_rating});
        })
    });
}

module.exports = {
    rateHotel: rateHotel
};