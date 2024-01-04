const mysql = require('mysql');
const dotenv = require('dotenv').config()

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWD,
    database: process.env.DATABASE_NAME
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});