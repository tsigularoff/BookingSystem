var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    room_type: {type: String, required: true},
    room_max_occupancy: {type: Number, required: true},
    price: {type: Number, required: true},
    pictureUrl: String,
    bookings: [
        {
            fromDate: Date,
            toDate: Date
        }
    ]
});
mongoose.model('Room', roomSchema);

module.exports.schema = roomSchema;
