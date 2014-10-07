var Hotel = require('mongoose').model('Hotel'),
    Room = require('mongoose').model('Room');

function createRoom(req, res, next) {

    Hotel.findOne({_id: req.params.id}).exec(function (err, hotel) {
        if (err) {
            console.log('Hotel could not be loaded: ' + err);
            res.status(404).json({
                error: 'Cannot find hotel'
            });
        }

        var room = new Room(req.body);
        hotel.rooms.push(room);
        hotel.save(function (err) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot create room'
                });
            }
            res.json(room);
        });
    });
}

module.exports = {
    createRoom: createRoom
};

