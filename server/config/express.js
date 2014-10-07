var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');
validator = require('node-validator');



module.exports = function (app, config) {

    app.set('reservationCheck', validator.isObject()
        .withRequired('fromDate', validator.isIsoDate())
        .withRequired('toDate', validator.isIsoDate())
        .withRequired('roomId', validator.isString()));

    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({resave: true, saveUninitialized: true, secret: 'booking stars'}));
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function (str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
};