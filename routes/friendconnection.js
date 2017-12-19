'use strict';

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

// POST /api/friendconnection
router.route('/friendconnection')
	.post(function(req, res) {
		console.log(JSON.stringify(req.body, null, 4));

		var array_id = [];

		var item1_existed = 0;
		var item2_existed = 0;
		// ----------------------------------------------------------------------------
		findIDbyEmail(req.body.friends[0])
			.then(function(rows){
				if ( rows.length == 0 ) {
					// insert 1st email address
					return insertIDwithEmail(req.body.friends[0]);
				} else {
					item1_existed = 1;
					array_id.push(rows[0].user_id);
				}
			})
			.then(function(rows){
				if ( item1_existed == 0 ) {
					array_id.push(rows.insertId);
				}
				// search 2nd email address
				return findIDbyEmail(req.body.friends[1])
			})
			.then(function(rows){
				if ( rows.length == 0 ) {
					// insert 2nd email address
					return insertIDwithEmail(req.body.friends[1]);
				} else {
					item2_existed = 1;
					array_id.push(rows[0].user_id);
				}
			})
			.then(function(rows){
				if ( item2_existed == 0 ) {
					array_id.push(rows.insertId);
				}
			})

		// insesrt db user_relationship
			.then(function(rows){
				return findKeybyIDs(array_id[0], array_id[1])
				r    })
			.then(function(rows){
				if ( rows.length == 0 ) {
					return insertKeywithIDs(array_id[0], array_id[1], 0, 0) ;
				}
			})
			.then(function(rows){
				return findKeybyIDs(array_id[1], array_id[0])
			})
			.then(function(rows){
				if ( rows.length == 0 ) {
					return insertKeywithIDs(array_id[1], array_id[0], 0, 0) ;
				}
			})
			.then(function(rows){
				res.json({ "success": true });
			})
			.catch(function (error) {
				console.log(error);
				res.json({ "success": false });
			});

	});

router.get('/friendconnection', function(req, res, next) {
	var obj = {};
	obj["success"] = true;
	res.json(JSON.stringify(obj, null, 4));
	//res.json({ title: 'Express' });
});

module.exports = router;
