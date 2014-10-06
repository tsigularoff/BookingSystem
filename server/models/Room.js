var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    room_type: String,
    room_max_occupancy: Number,
    price: Number,
    bookings: [
        {
            fromDate: Date,
            toDate: Date
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);
