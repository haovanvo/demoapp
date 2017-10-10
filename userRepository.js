'use strict';

var ObjectID = require('mongodb').ObjectID;
var DBService = require('./dbAccess');
var db = new DBService();

class UserRepository {
    GetOneAsync(id) {
        var objId = new ObjectID(id);
        return db.GetOneAsync('user', { "_id": objId });
    }

    FindUserAsync(userName){
        return db.GetOneAsync('user', { $or: [{ UserName: userName }, { Email: userName }] });
    }

    GetAllAsync(){
        return db.AllAsync('user');
    }
 
    AddNewAsync(user) {
        return db.AddNewAsync('user', user);
    }

    DeleteAsync(key) {
        var objKey = new ObjectID(key);
        return db.DeleteAsync('user', { "_id": objKey });
    }
}

module.exports = UserRepository;