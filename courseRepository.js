'use strict';

var ObjectID = require('mongodb').ObjectID;
var DBService = require('./dbAccess');
var db = new DBService();

class CourseRepository {
    GetOne(id) {
        return db.GetOne('course', { Id: id });
    }

    async GetOneAsync(id) {
        var objId = new ObjectID(id);
        return await db.GetOneAsync('course', { "_id": objId });
    }

    async FindCourseAsync(courseName){
        return await db.GetOneAsync('course', { CourseName: courseName });
    }

    async GetAllAsync(){
        return await db.AllAsync('course');
    }

    async AddNewAsync(course) {
        return await db.AddNewAsync('course', course);
    }

    async Delete(key) {
        return db.Delete('course', { Id: key });
    }
}

module.exports = CourseRepository;