/**
 * Created by Geno on 7.10.2014 г..
 */
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var Booking = mongoose.model('Booking');
var Room = mongoose.model('Room');


//function makeReservation(req, res, next) {
//    Hotel.findOne({_id: req.params.id})
//        .and([
//            {'rooms._id': req.body.roomId}
//        ])
//        .select('rooms')
//        .exec(function (err, hotel) {
//            if (err || !hotel) {
//                res.status(400).json({message: err ? err : 'No such hotel exists!'});
//            }
//
//            var booking = new Booking();
//            booking.fromDate = req.body.fromDate;
//            booking.toDate = req.body.toDate;
//            booking.bookerId = req.user;
//            var room = hotel.rooms.id(req.body.roomId);
//
//            room.bookings.push(booking);
//            hotel.save(function (err, hotel) {
//                if (err) {
//                    res.status(400).json({message: err});
//                }
//                res.send(room);
//            });
//        });
//}

function makeReservation(req, res, next) {
    console.log(req.body);


    res.status(200).json({
        prop : true
    });
}

module.exports = {
    makeReservation: makeReservation
};