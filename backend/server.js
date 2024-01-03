// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = 5000

// Initialisation d'Express
const app = express()
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})