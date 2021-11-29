(function(){
    'use strict';
    let mongoose = require('mongoose');
    require('dotenv').config();
    let mongoDBConfig = require('../../config/mongodb/mongo-config').mongodb;
    console.log(mongoDBConfig);
    module.exports = {
        init: init
    };

    async function init(){
        let options = {
            promiseLibrary: require('bluebird'),
            useNewUrlParser: true
        };
        
        let connectionString = prepareConnectionString(mongoDBConfig);
        console.log("ConnectionString: ",connectionString);
        console.log("MongoConfig", mongoDBConfig);

        await mongoose.connect(connectionString, options)
        .then(function(result){
            console.log("MongoDB connection successful. DB: " + connectionString);
        }).catch(function(error){
            console.log("Error occurred while connecting to DB: : " + connectionString);
        });
    };

    function prepareConnectionString(config){
        let connectionString = "mongodb+srv://";
        if(config.user){
            connectionString += config.user + ':' + config.password + '@';
        }
        connectionString += config.server + '/' + config.database+"?retryWrites=true&w=majority";

        return connectionString;
    };
})();