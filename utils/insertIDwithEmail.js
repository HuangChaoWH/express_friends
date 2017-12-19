'use strict';

var q          = require("q");
var mysql      = require("mysql");
var connection = require('../dbconnection');

function insertIDwithEmail(item) {
	var deferred = q.defer();

	var sql = "INSERT INTO sp_db.user (email_address) VALUES (?);";
	var inserts = [item];
	var queryString = mysql.format(sql, inserts);

	connection.query(queryString, function(err, rows, fields) {
		if (err) {
			console.log("Error: " + err);
			deferred.reject(err)
		}
		deferred.resolve(rows);
	});
	return deferred.promise;
}

module.exports = insertIDwithEmail;
