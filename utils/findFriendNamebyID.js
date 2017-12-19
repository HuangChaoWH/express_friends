'use strict';

var q          = require("q");
var mysql      = require("mysql");
var connection = require('../dbconnection');

function findFriendNamebyID (item1) {

	var deferred = q.defer();

	var sql = "SELECT u.email_address FROM sp_db.user_relationship r RIGHT JOIN sp_db.user u ON u.user_id = r.friend_id WHERE r.user_id = ? AND r.block = 0;";
	var inserts = [item1];
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

module.exports = findFriendNamebyID;
