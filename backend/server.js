// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = 3000
const mysql = require("mysql");

//Initialisation de la base de données
const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWD,
    database: process.env.DATABASE_NAME
});

// Initialisation d'Express
const app = express()
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});