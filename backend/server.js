// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = 3000

// Initialisation d'Express
const app = express()

console.log(process.env)
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})