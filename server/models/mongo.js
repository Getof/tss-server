const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/taxi";
global.mongoClient = new MongoClient(url, { useNewUrlParser: true });

// mongoClient.connect(url, function(err, db){
//     if (err) throw err;
//     console.log("Database connect");
//     db.close;
// });

module.exports = {

    rider: require('./mongos/rider')
};