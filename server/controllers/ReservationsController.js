/**
 * Created by Geno on 7.10.2014 г..
 */
var mongoose = require('mongoose');
var Hotel=mongoose.model('Hotel');
var Booking=mongoose.model('Booking');

function makeReservation(){
    Hotel.findOne({_id: req.params.id}).bookings.exec(function (err, hotel){
        res.send(hotel);
    });
}

module.exports={
    makeReservation:makeReservation
};