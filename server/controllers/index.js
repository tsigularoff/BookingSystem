var usersController = require('../controllers/usersController');
var coursesController = require('../controllers/coursesController');
var hotelsController = require('../controllers/hotelsController');
<<<<<<< HEAD
var reservationsController=require('../controllers/ReservationsController');
=======
var roomsController = require('../controllers/roomsController');
>>>>>>> origin/master


module.exports = {
    users: usersController,
    courses: coursesController,
    hotels: hotelsController,
<<<<<<< HEAD
    reservations:reservationsController
=======
    rooms: roomsController
>>>>>>> origin/master
};