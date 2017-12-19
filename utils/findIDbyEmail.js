'use strict';

var q          = require("q");
var mysql      = require("mysql");
var connection = require('../dbconnection');

function findIDbyEmail(item) {
	var deferred = q.defer();

	var sql = "SELECT user_id FROM sp_db.user WHERE email_address = (?);";
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

module.exports = findIDbyEmail;
