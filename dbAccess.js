'use strict';

const url = 'mongodb://admin:Abcd123!%40#@demoappdb-shard-00-00-gzx7l.mongodb.net:27017,demoappdb-shard-00-01-gzx7l.mongodb.net:27017,demoappdb-shard-00-02-gzx7l.mongodb.net:27017/test?ssl=true&replicaSet=demoappdb-shard-0&authSource=admin';

var mongoClient = require('mongodb').MongoClient;

class DBAccess {
    async GetOneAsync(collectionName, filter) {
        var db = await mongoClient.connect(url);
        var record = await db.collection(collectionName).findOne(filter);
        db.close();
        console.log('Collection is closed!');
        return record;
    }

    async AllAsync(collectionName) {
        var db = await mongoClient.connect(url);
        var records = await db.collection(collectionName).find().toArray();
        db.close();
        console.log('Collection is closed!');
        return records;
    }

    async AddNewAsync(collectionName, data) {
        var db = await mongoClient.connect(url);
        var record = await db.collection(collectionName).insertOne(data);
        db.close();
        console.log('Collection is closed!');
        return record.ops[0];
    }

    async DeleteAsync(collectionName, condition) {
        var db = await mongoClient.connect(url);
        var record = await db.collection(collectionName).deleteOne(condition);
        db.close();
        console.log('Collection is closed!');
        return true;
    }
}

module.exports = DBAccess;