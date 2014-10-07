var Course = require('mongoose').model('Course');

module.exports = {
    getAllCourses: function (req, res, next) {
        Course.find({}).exec(function (err, collection) {
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
