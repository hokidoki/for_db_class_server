var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.get('/search',function(req,res,next){
    var reqId = req.query.USER;
    var reqSearchKeword = req.query.SEARCH_KEWORD;
    var query = `SELECT ID,NAME, DUMMY.CHECK, DUMMY.FRIENDS_ROW_ID AS ROW_ID FROM USER left outer join 
        (select * from FRIENDS where USER_ID = '${reqId}') AS DUMMY ON USER.ID = DUMMY.FRIEND_ID 
            where USER.NAME like '%${reqSearchKeword}%' and USER.ID not like '${reqId}'`;
            console.log(query)
    // var queryString = `select ID, NAME FROM USER WHERE NAME LIKE '%${reqSearchKeword}%' or ID = '${reqSearchKeword}'`;
    connection.query(query,function(err,result){
        console.log(err);
        console.log(result);
        res.send(result);
    })
})


module.exports = router;