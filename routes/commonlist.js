'use strict';

var express = require('express');
var router = express.Router();

var connection            = require('../dbconnection');

var findFriendNamebyID    = require('../utils/findFriendNamebyID');
var findIDbyEmail         = require('../utils/findIDbyEmail');
var findKeybyIDs          = require('../utils/findKeybyIDs');
var findKeybyIDsUpdate    = require('../utils/findKeybyIDsUpdate');
var insertIDwithEmail     = require('../utils/insertIDwithEmail');
var insertKeywithIDs      = require('../utils/insertKeywithIDs');
var updateKeywithIDsBlock = require('../utils/updateKeywithIDsBlock');
var updateKeywithIDsType  = require('../utils/updateKeywithIDsType');

// retrieve common friends list
// POST /api/common
router.route('/commonlist')
	.post(function(req, res) {
		console.log(JSON.stringify(req.body, null, 4));

		var array_email1 = [];
		var array_email2 = [];
		var array_common = [];

		findIDbyEmail(req.body.friends[0])
			.then(function(rows){
				if ( rows.length == 0 ) {
					throw new Error('can not find email' + req.body.friends[0]);
					return null;
				} else {
					return findFriendNamebyID(rows[0].user_id)
				}
			})
			.then(function(rows){
				if ( rows.length == 0 ) {
					throw new Error('can not find friends for email' + req.body.friends[0]);
					return null;
				} else {
					rows.forEach( function(item){
						array_email1.push(item.email_address);
					});
					return findIDbyEmail(req.body.friends[1])
				}
			})
			.then(function(rows){
				if ( rows.length == 0 ) {
					throw new Error('can not find friends email' + req.body.friends[1]);
					return null;
				} else {
					return findFriendNamebyID(rows[0].user_id)
				}
			})
			.then(function(rows){
				if ( rows.length == 0 ) {
					throw new Error('can not find friends for email' + req.body.friends[1]);
					return null;
				} else {
					rows.forEach( function(item){
						array_email2.push(item.email_address);
					});
				}
			})
			.then(function(rows){
				array_email1.forEach( function(item1){
					array_email2.forEach( function(item2){
						if ( item1 == item2 ) {
							array_common.push(item1);
						}
					});
				});

				if ( array_common.length == 0 ) {
					throw new Error('can not find email' + req.body.friends[1]);
					return null;
				} else {
					var obj = {};
					obj["success"] = true;
					var key = "friends";
					obj[key] = [];
					array_common.forEach( function(item){
						obj[key].push(item);
					}
					);
					obj["count"] = array_common.length;
					res.json(JSON.stringify(obj, null, 4));
				}
			})
			.catch(function (error) {
				console.log(error);
				res.json({ "success": false });
			});
	});

module.exports = router;
