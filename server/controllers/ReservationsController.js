/**
 * Created by Geno on 7.10.2014 г..
 */
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var Booking = mongoose.model('Booking');
var Room = mongoose.model('Room');


function makeReservation(req, res, next) {
    Hotel.findOne({_id: req.params.id})
        .findOne({_id:req.params.id}).and([{'rooms._id':req.body.roomId}])
        .select('rooms')
        .exec(function (err, hotel) {
            if(err || !hotel){
                res.status(400).json({error:err?err:'No such room exists!'});
            }

            var booking=new Booking();
            booking.fromDate=req.body.fromDate;
            booking.toDate=req.body.toDate;
            booking.bookerId='to-delete-this';
            var room=hotel.rooms.id(req.body.roomId);
            
            room.bookings.push(booking);
            hotel.save(function (err, hotel) {
                res.send(room);
            });


        });

//console.log(req.body);
//    Room.findOne({_id:req.body.roomId}).exec(function (err,room) {
//        res.send(room);
//    });


}

module.exports = {
    makeReservation: makeReservation
};