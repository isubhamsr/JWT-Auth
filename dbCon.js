const sql = require("mysql")
const dotenv = require("dotenv")

dotenv.config();

const mysql = sql.createConnection({
    host : process.env.MYSQL_DB_HOST,
    user : process.env.MYSQL_DB_USER,
    password : process.env.MYSQL_DB_PASSWORD,
    database : process.env.MYSQL_DB_DATABASE
})

mysql.connect((err)=>{
    if(err) throw err
    console.log("Connected");
})

module.exports = mysql;