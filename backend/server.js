// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = 3000
const mysql = require("mysql");
const db = require('./database')
const app = express()

// Accepter les données envoyées par formulaire
app.use(express.json())
app.use(express.urlencoded())

//Routes
app.use('/api/albums', require('./routes/albumRoutes'));

// Initialisation d'Express
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
