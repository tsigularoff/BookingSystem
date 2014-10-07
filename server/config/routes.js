var auth = require('./auth'),
    controllers = require('../controllers'),
    validator = require('node-validator');

module.exports = function (app) {
    app.get('/api/users', auth.isInRole(['admin']), controllers.users.getAllUsers);
    app.delete('/api/users/:id', auth.isInRole(['admin']), controllers.users.deleteUser);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/courses', controllers.courses.getAllCourses);
    app.get('/api/courses/:id', controllers.courses.getCourseById);

    app.get('/api/hotels', controllers.hotels.getAllHotels);
    app.post('/api/hotels', auth.isAuthenticated, controllers.hotels.createHotel);
    app.post('/api/hotels/:id/reservations'/*, auth.isAuthenticated*/, validator.express(app.get('reservationCheck')), controllers.reservations.makeReservation);
    app.get('/api/hotels/:id', auth.isAuthenticated, controllers.hotels.getHotelById);
    app.delete('/api/hotels/:id', auth.isAuthenticated, controllers.hotels.deleteHotel);

    app.post('/api/hotels', auth.isInRole(['admin', 'owner']), controllers.hotels.createHotel);
    app.get('/api/hotels/:id', auth.isAuthenticated, controllers.hotels.getHotelById);

    app.post('/api/hotels/:id/rooms', auth.isInRole(['admin', 'owner']), controllers.rooms.createRoom);
    app.delete('/api/hotels/:id/rooms/:roomId', auth.isInRole(['admin', 'owner']), controllers.rooms.deleteRoom);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};