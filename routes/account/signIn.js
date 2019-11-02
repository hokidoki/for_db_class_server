var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.post('/signin',function(req,res,next){
    // console.log(req);
    // console.log(req.body.ID);
    var queryString = `SELECT * FROM ACCOUNT WHERE ID = '${req.body.ID}' AND PASSWORD='${req.body.PASSWORD}'`;
    console.log(queryString);
    // console.log(queryString)
    connection.query(queryString,function(err,result){
            // console.log(info)
            console.log(result)
            res.send(result);
    })
})

module.exports = router;