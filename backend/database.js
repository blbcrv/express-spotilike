var mysql = require('mysql');

var con = mysql.createConnection({
    host: "87.106.122.236",
    port: "3306",
    user: "",
    password: "",
    database: "spotilike"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});