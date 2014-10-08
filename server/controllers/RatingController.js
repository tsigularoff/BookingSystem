var Hotel = require('mongoose').model('Hotel');
var User = require('mongoose').model('User');

function isUserRated(allUsers, currentUserId) {
    var i, len = allUsers.length;

    for( i = 0; i< len; i+=1){
        if(allUsers[i]._id.toString() === currentUserId.toString()){
            return true;
        }
    }
    return false;
}

function rateHotel(req, res, next) {
    var rateData = req.body;

    Hotel.findOne({_id : rateData.hotelId}, function (err, hotel) {
        if(err){
            err;
        }

        if(!isUserRated(hotel.usersWithRates, rateData.userId)){
            hotel.usersWithRates.push(rateData.userId);
            hotel.star_rating += rateData.rate;

            hotel.save(function (err, hotel) {
                if(err){
                    err;
                }
                res.status(200).json({
                    star_rating: hotel.star_rating,
                    isAlreadyRated : false
                });
            })
        } else{
            res.status(200).json({
                star_rating: hotel.star_rating,
                isAlreadyRated : true
            });
        }

    });
}

module.exports = {
    rateHotel: rateHotel
};