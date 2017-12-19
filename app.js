'use strict';

var express     = require('express');
var app         = express();

var bodyParser  = require('body-parser');
var url         = require("url" );
var queryString = require("querystring");

var mysql       = require("mysql");
var q           = require("q");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create application/json parser
var jsonParser = bodyParser.json();

var port = process.env.PORT || 3000;        // set our port

var connection=require('./dbconnection');

connection.query(' CREATE SCHEMA IF NOT EXISTS sp_db DEFAULT CHARACTER SET UTF8; USE sp_db; DROP TABLE IF EXISTS user; DROP TABLE IF EXISTS user_relationship; CREATE TABLE user ( user_id INT NOT NULL AUTO_INCREMENT, email_address VARCHAR(100) NOT NULL UNIQUE, PRIMARY KEY (user_id) ); CREATE TABLE user_relationship ( user_id INT NOT NULL, friend_id INT NOT NULL, type INT NOT NULL, block INT NOT NULL, PRIMARY KEY (user_id, friend_id) ); ',
    function(err, results) {
        if (err) throw err;

    });

// ----------------------------------------------------------------------------
var friendconnection = require('./routes/friendconnection');
app.use('/api', friendconnection);

var friendlist = require('./routes/friendlist');
app.use('/api', friendlist);

var commonlist = require('./routes/commonlist');
app.use('/api', commonlist);

var subscribe = require('./routes/subscribe');
app.use('/api', subscribe);

var block = require('./routes/block');
app.use('/api', block);

var updatelist = require('./routes/updatelist');
app.use('/api', updatelist);

// ----------------------------------------------------------------------------
// start the server
if(!module.parent){
    app.listen(port);
    console.log('listened on port :' + port);
}

// export the express app used by Chai
module.exports = app;
