var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.post('/signup',function(req,res,next){
    // console.log(req);
    // console.log(req.body.ID);
    var queryString = `INSERT INTO USER(ID,PW,NAME,BIRTH,JOB,CURRENT_WEIGHT,GOAL_WEIGHT,COMMENT,DELETED,USER_LEVEL) VALUES('${req.body.ID}','${req.body.PASSWORD}','${req.body.NAME}','${req.body.BIRTH}','${req.body.JOB}',${Number(req.body.CURRENT_WEIGHT)},${Number(req.body.GOAL_WEIGHT)},'${req.body.COMMENT}',false,0)`;
    console.log(queryString);
    // console.log(queryString)
    connection.query(queryString,function(err,result){
        console.log(err);
        connection.query(`select * from USER where ID ='${req.body.ID}'`,function(err,info){
            // console.log(info)
            console.log(info)
            res.send(info);
            console.log(err);
        })
    })
})


module.exports = router;