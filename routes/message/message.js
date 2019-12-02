var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var moment = require('moment');

async function updateMessage(message,user,res) {
    // RIGHT :: Array.map using async-await and Promise.all
    const readingMessage = await Promise.all(
      message.map(item => {
        return updateRedingMessage(item,user);
      })
    );
    res.send(readingMessage);
  }

  async function updateRedingMessage(item,user) {
    return new Promise((resolve, reject) => {
        if(item.RECEIVER === user && !item.RECIEVE_DATE){
            let today = moment().format("YYYY-MM-DD HH:mm:ss");
            const updateQuery = `UPDATE MESSAGE SET RECIEVE_DATE = '${today}' WHERE MESSAGE_ROW_ID = '${item.MESSAGE_ROW_ID}'`;
            connection.query(updateQuery,function(err,commentResult){
              resolve(Object.assign(item,{RECIEVE_DATE : today}));
            })
        }else{
            resolve(item)
        }
    });
  }

router.post('/message',function(req,res,next){
    const from = req.body.from;
    const to = req.body.to;
    const message = req.body.message;
    const rowId = uuid.v1()
    const queryString = `INSERT INTO MESSAGE(MESSAGE_ROW_ID,SENDER,RECEIVER,MESSAGE,SEND_DATE) VALUES('${rowId}','${from}','${to}','${message}',now())`;
    connection.query(queryString, function (err, result) {
        res.send(true);
        console.log(err);
    }
)});

router.get('/message',function(req,res){
    
    const user = req.query.user;
    const talkWith = req.query.talkwith;

    // const queryString = `SELECT * FROM MESSAGE WHERE (SENDER = '${user}' AND RECEIVER = '${talkWith}') or (SENDER = '${talkWith}' AND RECEIVER = '${admin}') ORDER BY SEND_DATE`;
    const queryString = `select * from MESSAGE where MESSAGE_ROW_ID 
        IN (SELECT MESSAGE_ROW_ID from MESSAGE WHERE sender = '${user}' AND RECEIVER = '${talkWith}')
        OR MESSAGE_ROW_ID IN (SELECT MESSAGE_ROW_ID from MESSAGE WHERE sender = '${talkWith}' AND RECEIVER = '${user}') 
        ORDER BY SEND_DATE`;
    connection.query(queryString,function(err,result){
        console.log(result)
        updateMessage(result,user,res)
    })
})

module.exports = router;