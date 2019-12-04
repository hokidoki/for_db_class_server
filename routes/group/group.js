var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/group/join',function(req,res,next){
    var user = req.body.USER_ID;
    var groupKey = req.body.GROUP_KEY;
    var memberRowId = uuid.v1();

    var queryString = `INSERT INTO group_members VALUES('${memberRowId}','${groupKey}','${user}',0,1)`;
    connection.query(queryString, function (err, result) {
        connection.query(`SELECT * FROM group_members WHERE MEMBER_ROW_ID = '${memberRowId}'`,function(err,memberRow){
            console.log(err);
            console.log(memberRow);
            res.send(memberRow)
        })
    })
});

router.put('/group/join',function(req,res,next){
    var memberRowId = req.body.MEMBER_ROW_ID;
    var check = req.body.REQUEST_CHECK_STATE;
    var queryString = `update group_members set group_members.check= ${check} where MEMBER_ROW_ID ='${memberRowId}'`
    connection.query(queryString,function(err,result){
        console.log(err);
        console.log(result);
        res.send(result);
    })
})

router.get('/group/members',function(req,res,next){
    var searchMemberKeword = req.query.searchMemberKeword;
    var groupKey = req.query.groupKey;
    console.log(groupKey)
    console.log(searchMemberKeword)
    var queryString = `SELECT member_id,member_row_id,level from group_members where group_key = '${groupKey}' AND member_id like '%${searchMemberKeword}%' AND group_members.check != 0`;
    connection.query(queryString,function(err,result){
        console.log(err);
        console.log(result);
        res.send(result);
    })
})


router.put('/group/members',function(req,res,next){
    var member_row_id= req.data.memberRowId;
    var level = req.data.level;
    var queryString = `update group_members set level = ${level} where member_row_id = '${member_row_id}'`;
    connection.query(queryString,function(err,result){
        res.send(result);
    })
})

module.exports = router;