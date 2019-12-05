var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/group/article',function(req,res,next){
    const from = req.body.from;
    const group_key = req.body.group_key;
    const article = req.body.article;
    const image = req.body.image_Url === null ? null : req.body.image_Url;
    const rowId = uuid.v1()
    const queryString = `INSERT INTO group_article VALUES('${rowId}','${group_key}','${from}','${article}',now(),'${image}')`;
    connection.query(queryString, function (err, result) {
        res.send(result);
        console.log(result);
        console.log(err);
    }
)});

router.get('/group/article',function(req,res){
    
    const where = req.query.where;
    const queryString = `select * from group_article where group_key = '${where}' ORDER BY post_date`;
    connection.query(queryString,function(err,result){
        console.log(result);
        console.log(err);
        res.send(result)
    })
})

router.delete('/group/article',function(req,res){
    
    const postKey = req.body.postKey;
    const queryString = `delete from group_article where post_key = '${postKey}'`;
    connection.query(queryString,function(err,result){
        res.send(result)
    })
})

router.put('/group/article',function(req,res){
    
    const postKey = req.body.postKey;
    const article = req.body.article;    
    console.log(req.body)
    const image = req.body.image.image === "delete" ? '""' : `'${req.body.image.image}'`;

    
    const queryString = `Update group_article set post = "${article}", image_url= ${image} where post_key = '${postKey}'`;
    connection.query(queryString,function(err,result){
        console.log(err);
        res.send(result)
    })
})

module.exports = router;