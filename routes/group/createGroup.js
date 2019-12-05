var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/group/create',function(req,res,next){
    
    
    var admin = req.body.admin;
    console.log(req.body)
    var groupName = req.body.groupName;
    var group_id = uuid.v1();
    var group_comment = req.body.groupComment;
    
    var queryString = `INSERT INTO GROUP_INFO VALUES('${group_id}','${groupName}','${admin}','${group_comment}',now(),0)`;
    connection.query(queryString, function (err, result) {
            connection.query(`SELECT * FROM GROUP_INFO WHERE GROUP_MASTER = '${admin}' and DELETED != 1`,function(err,addGroup){
                    res.send(addGroup);
            })
        }
)})
;

module.exports = router;