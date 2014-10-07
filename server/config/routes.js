var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/courses', controllers.courses.getAllCourses);
    app.get('/api/courses/:id', controllers.courses.getCourseById);

    app.get('/api/hotels', controllers.hotels.getAllHotels);
    app.post('/api/hotels', auth.isAuthenticated, controllers.hotels.createHotel);
	app.post('/api/hotels/:id/reservations'/*, auth.isAuthenticated*/,validator.express(app.get('reservationCheck')), controllers.reservations.makeReservation);
    app.get('/api/hotels/:id', auth.isAuthenticated, controllers.hotels.getHotelById);


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