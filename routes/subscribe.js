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

// subscribe to updates from an email address
// PUT /api/subscribe
router.route('/subscribe')
.put(function(req, res) {
	console.log(JSON.stringify(req.body, null, 4));

    var array_id = [];

    var item1_existed = 0;
    var item2_existed = 0;

    findIDbyEmail(req.body.requestor)
        .then(function(rows){
            if ( rows.length == 0 ) {
                // insert 1st email address
                return insertIDwithEmail(req.body.requestor);
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
            return findIDbyEmail(req.body.target)
        })
        .then(function(rows){
            if ( rows.length == 0 ) {
                // insert 2nd email address
                return insertIDwithEmail(req.body.target);
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
        .then(function(rows){
            // insesrt db user_relationship
            return findKeybyIDs(array_id[0], array_id[1]) ;
        })
        .then(function(rows){
            if ( rows.length == 0 ) {
                return insertKeywithIDs(array_id[0], array_id[1], 1, 0) ;
             } else {
                return updateKeywithIDs(array_id[0], array_id[1], 1, 0) ;
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

module.exports = router;
