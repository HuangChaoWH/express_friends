'use strict';

var q          = require("q");
var mysql      = require("mysql");
var connection = require('../dbconnection');


function updateKeywithIDsBlock(item1, item2, block) {
	var deferred = q.defer();

	var sql = " UPDATE sp_db.user_relationship SET block = ?  WHERE user_id = (?) AND friend_id = (?);";
	var inserts = [block, item1, item2 ]; // type = friend, block = false
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

module.exports = updateKeywithIDsBlock;
