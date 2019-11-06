var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.get('/article',function(req,res,next){
    var reqId = req.query.ID;
    var reqFirstDate = req.query.FIRST_DATE;
    var reqLastDate = req.query.LAST_DATE;
    console.log(reqId);
    console.log(reqFirstDate);
    console.log(reqLastDate);
    // var queryString = `select COUNT(*) as VALID FROM USER WHERE ID = '${reqId}'`;
    // console.log(queryString)
    // connection.query(queryString,function(err,result){
    //     console.log(result)2
    //     res.send(result);
    // })
})

module.exports = router;