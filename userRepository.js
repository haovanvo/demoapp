'use strict';

var ObjectID = require('mongodb').ObjectID;
var DBService = require('./dbAccess');
var db = new DBService();

class UserRepository {
    GetOne(id) {
        return db.GetOne('user', { Id: id });
    }

    async GetOneAsync(id) {
        var objId = new ObjectID(id);
        return await db.GetOneAsync('user', { "_id": objId });
    }

    async FindUserAsync(userName){
        return await db.GetOneAsync('user', { $or: [{ UserName: userName }, { Email: userName }] });
    }

    async GetAll(){
        return db.All('user');
    }

    async AddNewAsync(user) {
        return await db.AddNewAsync('user', user);
    }

    async Delete(key) {
        return db.Delete('user', { Id: key });
    }
}

module.exports = UserRepository;