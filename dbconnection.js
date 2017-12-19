'use strict';

var mysql=require('mysql');

var connection = mysql.createConnection({
	multipleStatements: true,
	host: "localhost",
	user: "sp",
	password: "sp"
});

module.exports=connection;

