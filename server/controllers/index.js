var usersController = require('../controllers/usersController');
var coursesController = require('../controllers/coursesController');
var hotelsController = require('../controllers/hotelsController');
var reservationsController = require('../controllers/ReservationsController');

var roomsController = require('../controllers/roomsController');
var statisticsController = require('../controllers/StatisticsController');


module.exports = {
    users: usersController,
    courses: coursesController,
    hotels: hotelsController,
    reservations: reservationsController,
    rooms: roomsController,
    statistics : statisticsController
};