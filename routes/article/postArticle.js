var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/article',function(req,res,next){
    var articleId = uuid.v1();
    var writer = req.body.WRITER;
    var morning = req.body.MORNING;
    var lunch = req.body.LUNCH;
    var dinner = req.body.DINNER;
    var selectDate = req.body.DATE;
    var comment = req.body.COMMENT;
    var imageUrl = req.body.IMAGE_URL;
    console.log(imageUrl);
    if(imageUrl){
        var imageRowId = uuid.v1();
        var imageTableQuery = `INSERT INTO IMAGE_URL(ARTICLE_ROW_ID,IMAGE_ROW_ID,IMAGE_URL,WRITER,DATE) VALUES('${articleId}','${imageRowId}','${imageUrl}','${writer}','${selectDate}')`;
        var queryString = `INSERT INTO PRIVATE_ARTICLE(ARTICLE_ID,ID,MORNING,LUNCH,DINNER,CREATED_DATE,CREATE_AT,COMMENT) VALUES('${articleId}','${writer}','${morning}','${lunch}','${dinner}','${selectDate}',NOW(),'${comment}')`;
        connection.query(queryString,function(err,result){
            console.log(err);
            connection.query(imageTableQuery,function(err,imageResult){
                console.log(err)
                res.send(result);
            })
        })
    }else{
        var queryString = `INSERT INTO PRIVATE_ARTICLE(ARTICLE_ID,ID,MORNING,LUNCH,DINNER,CREATED_DATE,CREATE_AT,COMMENT) VALUES('${articleId}','${writer}','${morning}','${lunch}','${dinner}','${selectDate}',NOW(),'${comment}')`;
        console.log(queryString);
            connection.query(queryString,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                    res.send(result);
                }
         })
    }

    
})


module.exports = router;