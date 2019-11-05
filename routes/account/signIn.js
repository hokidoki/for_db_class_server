var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.post('/signin',function(req,res,next){
    var queryString = `SELECT * FROM USER WHERE ID = '${req.body.ID}' AND PW='${req.body.PASSWORD}'`;
    console.log(queryString);
        connection.query(queryString,function(err,result){
            if(err){
                console.log(err)
            }else{
                console.log(result);
                res.send(result);
            }
     })
})


module.exports = router;