var mysql_dbc = require('../../public/db/db_config')();
var connection = mysql_dbc.init();
var express = require('express');
var router = express.Router();

router.get('/data',function(req,res){
    
    const addressKeyword = req.query.addressKeyword;
    console.log(req.query)
    console.log(addressKeyword)
    const queryString =`select ExercisePlace, ExerciseAddress from publicinformation where ExerciseAddress like "%${addressKeyword}%" order by ExercisePlace desc limit 0, 50`;
    connection.query(queryString,function(err,result){
        console.log(err)
        res.send(result)

    })
})

module.exports = router;