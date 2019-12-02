var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/message',function(req,res,next){
    const from = req.body.from;
    const to = req.body.to;
    const message = req.body.message;
    const queryString = `INSERT INTO GROUP_INFO VALUES('${group_id}','${groupName}','${admin}','${group_comment}',now(),0)`;
    connection.query(queryString, function (err, result) {
        if(err){
            res.send(err)
        }else{
            connection.query(`SELECT * FROM GROUP_INFO WHERE GROUP_MASTER = '${admin}'`,function(err,result){
                if(err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            })
        }
    })
});

module.exports = router;