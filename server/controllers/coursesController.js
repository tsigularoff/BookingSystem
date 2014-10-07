var Course = require('mongoose').model('Course');
var validators=require('../utilities/validators');

var ALLOWED_SORT_COURSES=['name']; //TODO: Fill
var ITEMS_LIMIT=10;

module.exports = {
    getAllCourses: function (req, res, next) {
        var page = validators.validatePage(req.query.page);
        var sortBy = validators.validateSort(req.query.sortBy,ALLOWED_SORT_COURSES);

        Course.find({}).skip((page-1)*ITEMS_LIMIT).limit(ITEMS_LIMIT).exec(function (err, collection) {
            if (err) {
                res.status(400).json({message: err});
                console.log('Courses could not be loaded: ' + err);
            }
            res.send(collection);
        })
    },
    getCourseById: function (req, res, next) {
        Course.findOne({_id: req.params.id}).exec(function (err, course) {
            if (err) {

                console.log('Course could not be loaded: ' + err);
                res.status(400).json({message: err});
            }

            res.send(course);
        })
    }
};
