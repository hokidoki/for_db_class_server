var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var uuid = require('uuid');
var router = express.Router();

router.put('/user',function(req,res,next){
    const userId = req.body.userId;
    const nick = req.body.nick;
    const job = req.body.job;
    const currentWeight = req.body.currentWeight;
    const goalWeight = req.body.goalWeight;
    const comment = req.body.comment;
    const profileImage = req.body.profileImageSrc;

    const query = `UPDATE user SET NAME = '${nick}', JOB = '${job}', CURRENT_WEIGHT = ${currentWeight} , GOAL_WEIGHT = ${goalWeight}
                        COMMENT = '${comment}' PROFILE_IMAGE = '${profileImage}' WHERE ID = '${userId}'`;
    console.log(req.query.imageState);
    connection.query(query,function(err,result){
        console.log(err);
    })
})

module.exports = router;