'use strict';

var CourseRepository = require('./courseRepository');
var courseRepo = new CourseRepository();

class CourseController {
    async GetAll(req, res) {
        var courses = await courseRepo.GetAllAsync();
        res.end(JSON.stringify(courses));
    }
}

module.exports = CourseController;