'use strict';

var ObjectID = require('mongodb').ObjectID;
var DBService = require('./dbAccess');
var db = new DBService();

class CourseRepository {
    GetOneAsync(id) {
        var objId = new ObjectID(id);
        return db.GetOneAsync('course', { "_id": objId });
    }
 
    FindCourseAsync(courseName) {
        return db.GetOneAsync('course', { CourseName: courseName });
    }

    GetAllAsync() {
        return db.AllAsync('course');
    }

    AddNewAsync(course) {
        return db.AddNewAsync('course', course);
    }

    DeleteAsync(key) {
        var objKey = new ObjectID(key);
        return db.DeleteAsync('course', { "_id": objKey });
    }
}

module.exports = CourseRepository;