var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

async function article(addedArticle,users,addedGroupInfo,res) {
    // RIGHT :: Array.map using async-await and Promise.all
    const addedComment = await Promise.all(
      addedArticle.map(item => {
        return getComment(item);
      })
    );
    res.send({
        user : users,
        group : addedGroupInfo,
        article : addedComment
    });
  }

  async function getComment(item) {
    return new Promise((resolve, reject) => {
        const commentQuery = `select * from PRIVATE_ARTICLE_COMMENT where ARTICLE_ROW_ID = '${item.ARTICLE_ROW_ID}'`;
        connection.query(commentQuery,async function(err,commentResult){
          const addedRecomment = await Promise.all(
            commentResult.map((comment)=>{
              return getReComment(comment);
          }))
          resolve(Object.assign(item,{comment : addedRecomment}));
        })
    });
  }

  async function getReComment(comment) {
    return new Promise((resolve, reject) => {
        const commentQuery = `select * from PRIVATE_ARTICLE_RECOMMENT where FOR_COMMENT_ID = '${comment.COMMENT_ROW_ID}'`;
        connection.query(commentQuery,function(err,commentResult){
            resolve(Object.assign(comment,{recomment : commentResult}));
        })
    });
  }

router.get('/search',function(req,res,next){
    var reqId = req.query.USER;
    var reqSearchKeword = req.query.SEARCH_KEWORD;
    let query = `SELECT ID,NAME, DUMMY.CHECK, DUMMY.FRIENDS_ROW_ID AS ROW_ID FROM USER left outer join 
        (select * from FRIENDS where USER_ID = '${reqId}') AS DUMMY ON USER.ID = DUMMY.FRIEND_ID 
            where USER.NAME like '%${reqSearchKeword}%' and USER.ID not like '${reqId}'`;
            console.log(query)
    // var queryString = `select ID, NAME FROM USER WHERE NAME LIKE '%${reqSearchKeword}%' or ID = '${reqSearchKeword}'`;
    connection.query(query,function(err,users){
        let queryForgroup = `select * from group_info left outer join (select * from group_members where member_id = "${reqId}") as myGroup on myGroup.group_key = group_id where group_name like "%${reqSearchKeword}%" AND deleted != 1`;
        connection.query(queryForgroup,function(err,addedGroupInfo){
            let queryForArticle = `select USER.ID as ID ,USER.NAME, article.ARTICLE_ID as ARTICLE_ROW_ID,MORNING,LUNCH,DINNER,CREATED_DATE,article.COMMENT as CONTENTS,IMAGE_ROW_ID,IMAGE_URL 
            from USER right outer join (select * from PRIVATE_ARTICLE left outer join IMAGE_URL on PRIVATE_ARTICLE.ARTICLE_ID = IMAGE_URL.ARTICLE_ROW_ID 
              where PRIVATE_ARTICLE.COMMENT LIKE "%${reqSearchKeword}%" AND DELETED != 1)as article on article.ID = USER.ID WHERE SECRET != 1 ORDER BY CREATED_DATE DESC;`;
              connection.query(queryForArticle,function(err,addedArticle){
                article(addedArticle,users,addedGroupInfo,res)
            })
        })
    })
})


module.exports = router;