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

// retrieve email addresses can receive updates from an email address
// POST /api/updatelist
router.route('/updatelist')
.post(function(req, res) {
	console.log(JSON.stringify(req.body, null, 4));

    findIDbyEmail(req.body.sender)
        .then(function(rows){
            if ( rows.length == 0 ) {
                throw new Error('can not find email ' + req.body.sender);
                return null;
            } else {
                return findKeybyIDsUpdate(rows[0].user_id);
            }
        })
        .then(function(rows){
            if ( rows.length == 0 ) {
                throw new Error('can not find update list for email ' + req.body.sender);
                return null;
            } else {
                var obj = {};
                obj["success"] = true;
                var key = "recipients";
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
