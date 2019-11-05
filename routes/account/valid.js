var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
mysql_dbc.test_open(connection);

router.get('/valid/:id?',function(req,res,next){
    var reqId = req.query.id;
    console.log(reqId);
    var queryString = `select COUNT(*) as VALID FROM USER WHERE ID = '${reqId}'`;
    console.log(queryString)
    connection.query(queryString,function(err,result){
        console.log(result)
        res.send(result);
    })
})

module.exports = router;