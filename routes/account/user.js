var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.put('/user',function(req,res,next){
    const userId = req.body.userId;
    const nick = req.body.nick;
    const job = req.body.job;
    const currentWeight = req.body.currentWeight ? req.body.currentWeight : null;
    const goalWeight = req.body.goalWeight ?  req.body.goalWeight : null ;
    const comment = req.body.comment ? req.body.comment: null;
    const profileImage = req.body.profileImageSrc ? `'${req.body.profileImageSrc}'` : null;

    const query = `UPDATE user SET NAME = '${nick}', JOB = '${job}', CURRENT_WEIGHT = ${currentWeight} , GOAL_WEIGHT = ${goalWeight}, COMMENT = '${comment}' ,PROFILE_IMAGE = ${profileImage} WHERE ID = '${userId}'`;
    console.log(req.query.imageState);
    connection.query(query,function(err,result){
        connection.query(`SELECT * FROM USER WHERE ID = '${userId}'`,function(err,userInfo){
            connection.query(`select FRIENDS.FRIEND_ID, USER.NAME,FRIENDS.FRIENDS_ROW_ID 
            from USER left outer join FRIENDS ON USER.ID = FRIENDS.FRIEND_ID
                where FRIENDS.USER_ID ="${userId}" and FRIENDS.CHECK=1;`,function(err,friends){
                    userInfo[0].friends = friends;
                    res.send(userInfo);
                })
        })
    })
})

router.get('/user',function(req,res){
    connection.query(`select FRIENDS.FRIEND_ID, USER.NAME,FRIENDS.FRIENDS_ROW_ID 
                                        from USER left outer join FRIENDS ON USER.ID = FRIENDS.FRIEND_ID
                                            where FRIENDS.USER_ID ="${req.body.ID}" and FRIENDS.CHECK=1;`,function(err,friends){
                                                userInfo[0].friends = friends;
                                                connection.query(`select * from group_info where group_master = '${req.body.ID}'`,function(err,manageGroup){
                                                    userInfo[0].manageGroup = manageGroup;
                                                    res.send(userInfo);
                                                })
                                            })
})

router.get('/user/whoFollowMe',function(req,res){
    const userId = req.query.userId;
    const whoFollowMeQuery = `select FRIENDS_ROW_ID as frien_row ,ID, NAME, COMMENT, FRIEND.CHECK ,PROFILE_IMAGE from 
	USER left outer join (select * from 
		FRIENDS where USER_ID = '${userId}') as FRIEND
			on USER.ID =  FRIEND.USER_ID
                where ID in (select USER_id from FRIENDS where FRIEND_ID = '${userId}') and ID != '${userId}'`;
    connection.query(whoFollowMeQuery,function(err,whoFollowMe){
        console.log(err)
        const whoUnfollowMeQuery= `select FRIENDS_ROW_ID as frien_row ,ID, NAME, COMMENT, FRIEND.CHECK ,PROFILE_IMAGE from 
        USER left outer join (select * from 
            FRIENDS where USER_ID = '${userId}') as FRIEND
                on USER.ID =  FRIEND.USER_ID
                    where ID not in (select USER_id from FRIENDS where FRIEND_ID = '${userId}') and ID != '${userId}'`;
        connection.query(whoUnfollowMeQuery,function(err,whoUnfollowme){
            console.log(err)
            res.send({
                whoFollowMe : whoFollowMe,
                whoUnFollowMe : whoUnfollowme
            })
        })
    })
})

module.exports = router;