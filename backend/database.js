const mysql= require('mysql');

const con = mysql.createConnection({
    host: localhost,
    user: clmt,
    password: 130702,
    database: test
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Base de données OK !");
});

module.exports = con;
