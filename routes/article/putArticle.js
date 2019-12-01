var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.put('/article/privateArticle', function (req, res, next) {
    const imageState = req.query.imageState;
    const articleRowId = req.body.articleRowId;
    const writer = req.body.writer;
    const breakFast = req.body.breakFast;
    const lunch = req.body.lunch;
    const dinner = req.body.dinner;
    const comment = req.body.comment;
    const image = req.body.image.image;
    const image_row_id = uuid.v1();
    let query = `UPDATE PRIVATE_ARTICLE SET MORNING = '${breakFast}', LUNCH = '${lunch}', DINNER = '${dinner}', COMMENT = '${comment}' WHERE ARTICLE_ID = '${articleRowId}'`;

    connection.query(query, function (err, result) {
        console.log(err);
        if (imageState !== 'default') {
            if (imageState === "update") {
                query = `UPDATE IMAGE_URL SET IMAGE_URL = '${image}' WHERE ARTICLE_ROW_ID = '${articleRowId}'`;
            } else if (imageState === "delete") {
                query = `DELETE FROM IMAGE_URL WHERE ARTICLE_ROW_ID = '${articleRowId}'`;
            } else if (imageState === 'new') {
                query = `INSERT INTO IMAGE_URL VALUES('${articleRowId}','${image_row_id}','${image}','${writer}',now())`;
            }

            connection.query(query,function(err, imageResult){
                res.send(true);
            })
        }else{
            console.log(err);
            res.send(true);
        }
    })
});

router.delete('/article/privateArticle',function(req,res){
    const articleRowId = req.body.articleRowId;
    const query = `UPDATE PRIVATE_ARTICLE SET DELETED = '1' WHERE ARTICLE_ID = '${articleRowId}'`;
    connection.query(query,function(err,result){
        console.log(err);
        console.log(result);
        res.send(true);
    })
})

router.put('/article/comment',function(req,res){
    const where = req.body.where;
    const updatedComment = req.body.comment;
    const commentId = req.body.commentId; 

    const query = `UPDATE ${where} SET COMMENT = '${updatedComment}' WHERE COMMENT_ROW_ID = '${commentId}'`;
    connection.query(query,function(err,result){
        if(!err){
            res.send(true);
        }else{
            console.log(err);
        }
    })
})

router.delete('/article/comment',function(req,res){
    const where = req.body.where;
    const commentId = req.body.commentId; 

    const query = `UPDATE ${where} SET DELETED = 1 WHERE COMMENT_ROW_ID = '${commentId}'`;
    connection.query(query,function(err,result){
        if(!err){
            res.send(true);
        }else{
            console.log(err);
        }
    })
})

module.exports = router;