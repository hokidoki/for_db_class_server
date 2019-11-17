var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
mysql_dbc.test_open(connection);

router.get('/valid', function (req, res, next) {
    var mode = req.query.mode;

    if (mode == "id") {
        var reqId = req.query.id;
        console.log(reqId);
        var queryString = `select COUNT(*) as VALID FROM USER WHERE ID = '${reqId}'`;
        console.log(queryString)
        connection.query(queryString, function (err, result) {
            console.log(result)
            res.send(result);
        })
    }else if(mode == "group"){
        var reqGroupName = req.query.groupName;
        var queryString = `select COUNT(*) as VALID FROM group_info WHERE GROUP_NAME = '${reqGroupName}'`;
        console.log(reqGroupName)
        connection.query(queryString, function (err, result) {
            console.log(result)
            console.log(err);
            if(result[0].VALID == 1){
                res.send(true);
            }else{
                res.send(false)
            }            
        })
    }
})

module.exports = router;