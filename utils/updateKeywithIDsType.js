'use strict';

var q          = require("q");
var mysql      = require("mysql");
var connection = require('../dbconnection');

function updateKeywithIDsType(item1, item2, type, block) {
	var deferred = q.defer();

	var sql = " UPDATE sp_db.user_relationship SET type = ?  WHERE user_id = (?) AND friend_id = (?);";
	var inserts = [type, item1, item2 ]; // type = friend, block = false
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

module.exports = updateKeywithIDsType;
