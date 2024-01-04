const mysql= require('mysql');

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWD,
    database: process.env.DATABASE_NAME
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Base de données OK !");
});

module.exports = con;