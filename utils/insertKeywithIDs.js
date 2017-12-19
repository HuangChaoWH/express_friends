'use strict';

var q          = require("q");
var mysql      = require("mysql");
var connection = require('../dbconnection');

function insertKeywithIDs(item1, item2, type, block) {
	var deferred = q.defer();

	var sql = "INSERT INTO sp_db.user_relationship (user_id, friend_id, type, block) VALUES (?, ?, ?, ?);";
	var inserts = [item1, item2, type, block]; // type = friend, block = false
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

module.exports = insertKeywithIDs;
