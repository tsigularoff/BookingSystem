var Hotel = require('mongoose').model('Hotel');

function getAllHotels(req, res, next) {
    Hotel.find({}).exec(function (err, collection) {
        if(err){
            throw "Hotels could not be loaded" + err;
        }

        res.send(collection);
    })
}

module.exports = {
    getAllHotels : getAllHotels
};