var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/article',function(req,res,next){
    var articleId = uuid.v1();
    var queryString = `INSERT INTO PRIVATE_ARTICLE(ARTICLE_ID,ID,MORNING,LUNCH,DINNER,CREATED_DATE,CREATE_AT,COMMENT) VALUES('${articleId}','${req.body.WRITER}','${req.body.MORNING}','${req.body.LUNCH}','${req.body.DINNER}','${req.body.DATE}',NOW(),'${req.body.COMMENT}')`;
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