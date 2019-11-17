var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

async function article(result,res) {
    // RIGHT :: Array.map using async-await and Promise.all
    const addedComment = await Promise.all(
      result.map(item => {
        return getComment(item);
      })
    );
    console.log(addedComment);
    res.send(addedComment);
  }

  async function getComment(item) {
    return new Promise((resolve, reject) => {
        const commentQuery = `select * from PRIVATE_ARTICLE_COMMENT where ARTICLE_ROW_ID = '${item.ARTICLE_ROW_ID}'`;
        connection.query(commentQuery,async function(err,commentResult){
          const addedRecomment = await Promise.all(
            commentResult.map((comment)=>{
              return getReComment(comment);
          }))
          console.log(addedRecomment)
          resolve(Object.assign(item,{comment : addedRecomment}));
        })
    });
  }

  async function getReComment(comment) {
    return new Promise((resolve, reject) => {
      console.log(comment)
        const commentQuery = `select * from PRIVATE_ARTICLE_RECOMMENT where FOR_COMMENT_ID = '${comment.COMMENT_ROW_ID}'`;
        connection.query(commentQuery,function(err,commentResult){
          console.log(commentResult,err);
            resolve(Object.assign(comment,{recomment : commentResult}));
        })
    });
  }
  

router.get('/article',function(req,res,next){
  
    var mod = req.query.mod;
    console.log("hello")
  console.log(mod)
    if(mod == "updatedArticle"){
      console.log('12')
      var articleRowId = req.query.articleRowId;
      var queryString = `select USER.NAME, article.ARTICLE_ID as ARTICLE_ROW_ID,MORNING,LUNCH,DINNER,CREATED_DATE,article.COMMENT as CONTENTS,IMAGE_ROW_ID,IMAGE_URL 
          from USER right outer join (select * from PRIVATE_ARTICLE left outer join IMAGE_URL on PRIVATE_ARTICLE.ARTICLE_ID = IMAGE_URL.ARTICLE_ROW_ID 
            where PRIVATE_ARTICLE.ARTICLE_ID = "${articleRowId}")as article on article.ID = USER.ID ;`;
            connection.query(queryString,function(err,result){
              article(result,res)
        })
    }else if(mod =="full"){
      console.log('g')
      var userId = req.query.userId;  
      var queryString = `select USER.NAME,ARTICLE_ROW_ID, article.ARTICLE_ID as ARTICLE_ROW_ID,MORNING,LUNCH,DINNER,CREATED_DATE,article.COMMENT as CONTENTS,IMAGE_ROW_ID,IMAGE_URL from USER right outer join (select *
          from PRIVATE_ARTICLE left outer join IMAGE_URL on PRIVATE_ARTICLE.ARTICLE_ID = IMAGE_URL.ARTICLE_ROW_ID
              where PRIVATE_ARTICLE.ID in (select FRIEND_ID from FRIENDS where USER_ID = '${userId}') or PRIVATE_ARTICLE.ID = '${userId}' 
                  order by CREATED_DATE desc limit 0, 10) as article on USER.ID = article.ID;`;
      connection.query(queryString,function(err,result){
          article(result,res)
    })
  }
})
module.exports = router;
       
    //    const dummy = await Promise.all(result.map((item)=>{
    //         // let addedComment;
    //         const commentQuery = `select * from PRIVATE_ARTICLE_COMMENT where ARTICLE_ROW_ID = '${item.ARTICLE_ROW_ID}'`;

    //         return new Promise(function(resolve,reject){
    //             connection.query(commentQuery,function(err,commentResult){
    //                 resolve(Object.assign(item,{comment : commentResult}));
    //             })
    //         })
    //     }))
    //     console.log(dummy);
    //     res.send(result);



