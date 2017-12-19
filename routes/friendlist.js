var express = require('express');
var router = express.Router();

//var utils= require('./utils/utils');
var connection            = require('../dbconnection');

var findFriendNamebyID    = require('../utils/findFriendNamebyID');
var findIDbyEmail         = require('../utils/findIDbyEmail');
var findKeybyIDs          = require('../utils/findKeybyIDs');
var findKeybyIDsUpdate    = require('../utils/findKeybyIDsUpdate');
var insertIDwithEmail     = require('../utils/insertIDwithEmail');
var insertKeywithIDs      = require('../utils/insertKeywithIDs');
var updateKeywithIDsBlock = require('../utils/updateKeywithIDsBlock');
var updateKeywithIDsType  = require('../utils/updateKeywithIDsType');

// retrieve friends list
// POST /api/friendlist
// SELECT u.email_address FROM sp_db.user_relationship r RIGHT JOIN sp_db.user u ON u.user_id = r.friend_id WHERE r.user_id = 1;//
// SELECT u.email_address FROM sp_db.user_relationship r RIGHT JOIN sp_db.user u ON u.user_id = r.friend_id WHERE r.user_id = 1 ORDER BY u.user_id;
router.route('/friendlist')
	.post(function(req, res) {
		console.log(JSON.stringify(req.body, null, 4));

		var array_id = [];
		var item1_existed = 0;

		findIDbyEmail(req.body.email)
			.then(function(rows){
				if ( rows.length == 0 ) {
					throw new Error('can not find email' + req.body.email);
					return null;
				} else {
					item1_existed = 1;
					array_id.push(rows[0].user_id);
					return findFriendNamebyID(rows[0].user_id)
				}
			})
			.then(function(rows){
				if ( rows.length == 0 ) {
				} else {
					var obj = {};
					obj["success"] = true;
					var key = "friends";
					obj[key] = [];
					rows.forEach( function(item){
						obj[key].push(item.email_address);
					}
					);
					obj["count"] = rows.length;
					res.json(JSON.stringify(obj, null, 4));
				}
			})

			.catch(function (error) {
				console.log(error);
				res.json({ "success": false });
			});
	});

module.exports = router;
