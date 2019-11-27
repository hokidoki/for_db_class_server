var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.post('/user/signin',function(req,res,next){
    var queryString = `SELECT * ,COUNT(*) as VALID FROM USER WHERE ID = '${req.body.ID}' AND PW='${req.body.PASSWORD}'`;
    var user = {};
    // console.log(queryString);
        connection.query(queryString,function(err,userInfo){
            try {
                if(userInfo[0].VALID){
                    connection.query(`select FRIENDS.FRIEND_ID, USER.NAME,FRIENDS.FRIENDS_ROW_ID 
                                        from USER left outer join FRIENDS ON USER.ID = FRIENDS.FRIEND_ID
                                            where FRIENDS.USER_ID ="${req.body.ID}" and FRIENDS.CHECK=1;`,function(err,friends){
                                                userInfo[0].friends = friends;
                                                connection.query(`select * from group_info where group_master = '${req.body.ID}'`,function(err,manageGroup){
                                                    userInfo[0].manageGroup = manageGroup;
                                                    res.send(userInfo);
                                                })
                                            })
                }else{
                    console.log(err)
                }
            } catch (error) {
                console.log(error)
            }
            

            // connection
     })
})


module.exports = router;