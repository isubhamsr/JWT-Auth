const sql = require("mysql")


// console.log(process.env.MYSQL_DB_HOST);

const mysql = sql.createConnection({
    host : "localhost",
    user : "root",
    password : "Roy@12345",
    database : "todo_list"
})

mysql.connect((err)=>{
    if(err) throw err
    console.log("Connected");
})

module.exports = mysql;