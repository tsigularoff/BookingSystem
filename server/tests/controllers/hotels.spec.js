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
        });
        it('should find show the whole information for the hotel', function (done) {
            var req = {};
            req.query = {};
            var res = {};
            res.send = function (collection) {
                for (var i = 0; i < collection.length; i++) {
                    expect(expected[i]._id).to.eql(collection[i]._id);
                    expect(expected[i].name).to.eql(collection[i].name);
                    expect(expected[i].description).to.eql(collection[i].description);
                    expect(expected[i].address).to.eql(collection[i].address);
                    expect(expected[i].city).to.eql(collection[i].city);
                    expect(expected[i].star_rating).to.eql(collection[i].star_rating);
                    expect(expected[i].pictureUrl).to.eql(collection[i].pictureUrl);
                    expect(expected[i].owner).to.eql(collection[i].owner);
                    expect(expected[i].usersWithRates).to.eql(collection[i].usersWithRates);
                    expect(expected[i].userRating).to.eql(collection[i].userRating);
                }
                done();
            };
            var expected = [];
            Hotel.create({
                name: 'TestHotel',
                description: 'test desc',
                star_rating: 5,
                address: 'Center',
                city: 'Sofia',
                pictureUrl: 'http://bucharest-guide.ro/poze/76b4d89b45fb70dc02ddf8aa4f077585.jpg',
                owner: 'test',
                usersWithRates: [],
                userRating: 0
            }, function (err, result) {
                expected.push(result);
                hotelsController.getAllHotels(req, res);
            });
        })
    })
});
