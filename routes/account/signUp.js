var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.post('/signup',function(req,res,next){
    // console.log(req);
    // console.log(req.body.ID);
    var queryString = `INSERT INTO ACCOUNT(ID,PASSWORD,NAME,GOAL_WEIGHT,CURRENT_WEIGHT,COMMENT,BIRTH,JOB) VALUES('${req.body.ID}','${req.body.PASSWORD}','${req.body.NAME}',${Number(req.body.GOALWEIGHT)},${Number(req.body.CURRENTWEIGHT)},'${req.body.COMMENT}','${req.body.BIRTH}','${req.body.JOB}')`;
    console.log(queryString);
    // console.log(queryString)
    connection.query(queryString,function(err,result){
        connection.query(`select * from ACCOUNT where ID ='${req.body.ID}'`,function(err,info){
            // console.log(info)
            console.log(info)
            res.send(info);
        })
    })
})

module.exports = router;