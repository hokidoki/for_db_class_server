var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/group/message',function(req,res,next){
    const from = req.body.from;
    const to = req.body.group_key;
    const message = req.body.message;
    const rowId = uuid.v1()
    const queryString = `INSERT INTO group_message VALUES('${rowId}','${to}','${from}','${message}',now())`;
    connection.query(queryString, function (err, result) {
        res.send(result);
        console.log(result);
        console.log(err);
    }
)});

router.get('/group/message',function(req,res){
    
    const where = req.query.where;

    // const queryString = `SELECT * FROM MESSAGE WHERE (SENDER = '${user}' AND RECEIVER = '${talkWith}') or (SENDER = '${talkWith}' AND RECEIVER = '${admin}') ORDER BY SEND_DATE`;
    const queryString = `select * from group_message where group_key = '${where}' ORDER BY SEND_DATE`;
    connection.query(queryString,function(err,result){
        console.log(result);
        console.log(err);
        res.send(result)
    })
})

module.exports = router;