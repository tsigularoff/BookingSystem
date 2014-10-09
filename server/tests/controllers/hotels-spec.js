var mongoose = require('mongoose');
var config = require('../../config/config').test;
require('../../config/mongoose')(config);
var Hotel = require('mongoose').model('Hotel');
var Room = require('mongoose').model('Room');
var User = require('mongoose').model('User');
var Booking = require('mongoose').model('Booking');

var hotelsController = require('../../controllers/HotelsController');
var expect = require('chai').expect;

describe('HotelsController', function () {
    describe('getAllHotels', function () {
        beforeEach(function (done) {
            mongoose.connection.collections['hotels'].drop(function () {
                done();
            });
        });
        it('should show no hotels with empty database', function (done) {
            var req = {};
            req.query = {};
            var res = {};
            res.send = function (collection) {
                expect(collection).to.be.empty;
                done();
            };
            hotelsController.getAllHotels(req, res);
        });
        it('should show one hotel when one is existing in the database', function (done) {
            var req = {};
            req.query = {};
            var res = {};
            res.send = function (collection) {
                expect(collection.length).to.equal(1);
                for (var i = 0; i < collection.length; i++) {
                    expect(expected[i]._id).to.eql(collection[i]._id);
                }
                done();
            };
            var expected = [];
            Hotel.create({
                name: 'TestHotel',
                description: 'test desc',
                address: 'test address',
                city: 'TestCity'
            }, function (err, result) {
                expected.push(result);
                hotelsController.getAllHotels(req, res);
            });
        })
    })
});
