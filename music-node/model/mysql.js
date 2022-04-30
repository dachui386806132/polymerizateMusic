let mysql = require("mysql")
var pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    port            : 3306,
    database        : 'my_music_project'
})

const query=(sql,params,callback)=>{
    pool.getConnection((err,conn)=>{
        if(err){
            console.log("连接失败")
            conn.end()
            return
        }
        conn.query(sql,params,callback)
        conn.end()
    })
}

module.exports=query