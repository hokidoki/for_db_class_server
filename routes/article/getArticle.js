var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.get('/article',function(req,res,next){
    var userId = req.query.userId;
    var friendsJson = req.query.friends;
    var friends = JSON.parse(friendsJson);
    var stringFriendId = `'${userId}'`;
    friends.map((item)=>{
        stringFriendId = stringFriendId + `, '${item.FRIEND_ID}'`
    })
    var queryString = `SELECT * FROM PRIVATE_ARTICLE WHERE ID = '${reqId}' AND CREATED_DATE BETWEEN '${reqFirstDate}' AND '${reqLastDate}'`;
    // console.log(queryString)
    // connection.query(queryString,function(err,result){
    //     console.log(result);
    //     res.send(result);
    // })
})

module.exports = router;