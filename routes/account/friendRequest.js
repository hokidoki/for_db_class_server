var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var uuid = require('uuid');
var router = express.Router();

router.post('/friendRequest',function(req,res,next){
    var userId = req.body.USER_ID;
    var friendRequestId = req.body.FRIEND_REQUEST_ID;
    var friendRowId = uuid.v1();
  

    var queryString = `INSERT INTO FRIENDS VALUES('${friendRowId}', '${userId}', '${friendRequestId}',1)`;
    console.log(queryString);
    connection.query(queryString,function(err,result){
        console.log(result);
        console.log(err)
        res.send(friendRowId);
    })
})

router.put('/friendRequest',function(req,res,next){
    var rowId = req.body.ROW_ID;
    var requestCheckState = req.body.REQUEST_CHECK_STATE;
    var queryString = `update FRIENDS set FRIENDS.CHECK= ${requestCheckState} where FRIENDS_ROW_ID ='${rowId}'`
    connection.query(queryString,function(err,result){
        console.log(result);
        res.send(result);
    })
})

module.exports = router;