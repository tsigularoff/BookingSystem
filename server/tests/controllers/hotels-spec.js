var mongoose = require('mongoose');
var config = require('../../config/config').test;
require('../../config/mongoose')(config);
var hotelsController = require('../../controllers/HotelsController');
var expect = require('chai').expect;

describe('HotelsController', function () {
    beforeEach(function (done) {
        mongoose.connection.collections['hotels'].drop(function (err) {
            done();
        });
    });
    describe('getAllHotels', function () {
        it('should show no hotels with empty database', function (done) {
            var req = {};
            req.query = {};
            var res = {};
            var hotels;
            res.send = function (collection) {
                hotels = collection;
                expect(hotels).to.be.empty;
                done();
            };
            hotelsController.getAllHotels(req, res);
        })
    })
});
