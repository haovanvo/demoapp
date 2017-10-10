'use strict';

var CourseRepository = require('./courseRepository');
var courseRepo = new CourseRepository();

class CourseController {
    GetAll(req, res) {
        courseRepo.GetAllAsync().then((courses) => {
            res.end(JSON.stringify(courses));
        });
    }
}

module.exports = CourseController;