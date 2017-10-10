'use strict';

//const url = 'mongodb://admin:Abcd123!%40#@demoappdb-shard-00-00-gzx7l.mongodb.net:27017,demoappdb-shard-00-01-gzx7l.mongodb.net:27017,demoappdb-shard-00-02-gzx7l.mongodb.net:27017/test?ssl=true&replicaSet=demoappdb-shard-0&authSource=admin';
const url = "mongodb://localhost:27017/demoappdb";
var mongoClient = require('mongodb').MongoClient;

class DBAccess {
    GetOneAsync(collectionName, filter) {
        return new Promise((resolve, reject) => {
            return mongoClient.connect(url).then((db) => {
                db.collection(collectionName).findOne(filter).then((record) => {
                    db.close();
                    console.log('Collection is closed!');
                    return resolve(record);
                });
            }).catch((err) => { return reject(err); });
        });
    }

    AllAsync(collectionName) {
        return new Promise((resolve, reject) => {
            return mongoClient.connect(url).then((db) => {
                db.collection(collectionName).find().toArray((err, records) => {
                    db.close();
                    console.log('Collection is closed!');
                    return resolve(records);
                });
            }).catch((err) => { return reject(err); });;
        });
    }

    AddNewAsync(collectionName, data) {
        return new Promise((resolve, reject) => {
            return mongoClient.connect(url).then((db) => {
                db.collection(collectionName).insertOne(data).then((result) => {
                    db.close();
                    console.log('Collection is closed!');
                    return resolve(result.ops[0]);
                });
            });
        }).catch((err) => { return reject(err); });;
    }

    DeleteAsync(collectionName, condition) {
        return new Promise((resolve, reject) => {
            return mongoClient.connect(url).then((db) => {
                db.collection(collectionName).deleteOne(condition).then((result) => {
                    db.close();
                    console.log('Collection is closed!');
                    return resolve(true);
                });
            });
        }).catch((err) => { return reject(err); });;
    }
}

module.exports = DBAccess;