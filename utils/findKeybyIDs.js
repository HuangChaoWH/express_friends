'use strict';

var q          = require("q");
var mysql      = require("mysql");
var connection = require('../dbconnection');

function findKeybyIDs (item1, item2) {

	var deferred = q.defer();

	var sql = "SELECT user_id friend_id FROM sp_db.user_relationship WHERE user_id = (?) AND friend_id = (?);";
	var inserts = [item1, item2];
	var queryString = mysql.format(sql, inserts);

	connection.query(queryString, function(err, results, fields) {
		if (err) {
			console.log("Error: " + err);
			deferred.reject(err)
		}
		deferred.resolve(results);
	});
	return deferred.promise;
}

module.exports = findKeybyIDs;
