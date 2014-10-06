var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    room_type: String,
    room_max_occupancy: Integer,
    price: Double,
    bookings: [
        {
            fromDate: Date,
            toDate: Date
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);
