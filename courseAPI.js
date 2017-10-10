'use strict';

var CourseRepository = require('./courseRepository');
var courseRepo = new CourseRepository();

class CourseController {
    GetAll(req, res) {
        courseRepo.GetAllAsync().then((courses) => {
            res.end(JSON.stringify(courses));
        });
    }

    AddNew(req, res) {
        var model = req.body;
        if (!model) {
            res.statusCode = 400;//bad request
            res.end('New course data is null!');
            return;
        }

        if (!model.name) {
            res.statusCode = 400;//bad request
            res.end('Course name is required!');
            return;
        }

        if (!model.price) {
            res.statusCode = 400;//bad request
            res.end('Course price is required!');
            return;
        }

        courseRepo.AddNewAsync(model).then((newCourse) => {
            res.end(JSON.stringify(newCourse));
        });
    }

    Delete(req, res) {
        var deleteCourseName = req.params.courseName;
        if (!deleteCourseName) {
            res.statusCode = 400;//bad request
            res.end('Delete Course is not found!');
            return;
        };

        courseRepo.FindCourseAsync(deleteCourseName).then((course) => {
            if (!course) {
                res.statusCode = 400;//bad request
                res.end('Delete Course is not found!');
                return;
            }
            courseRepo.DeleteAsync(course._id).then((result) => {
                if (result !== true) {
                    res.statusCode = 500;
                    res.end('There is a problem while the system attempts to delete course!');
                    return;
                }

                res.end('The course is deleted successful!');
            });
        });
    }

    GetOne(req, res) {
        var courseName = req.params.courseName;
        if (!courseName) {
            res.statusCode = 400;//bad request
            res.end('Course is not found!');
            return;
        }

        courseRepo.FindCourseAsync(courseName).then((course) => {
            res.end(JSON.stringify(course));
        });
    }
}

module.exports = CourseController;