// Import des modules
const express = require('express');
const dotenv = require('dotenv').config();
const port = 3000;
const mysql = require("mysql");
const db = require('./database');
const path = require('path');
const app = express();

// Accepter les données envoyées par formulaire
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'..', 'frontend/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'frontend', 'index.html'));
});


//Routes
app.use('/api/albums', require('./routes/albumRoutes'));
app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/artists', require('./routes/artistRoutes'));
// Initialisation d'Express
app.listen(port, () => {
    console.log(`Server started on ${port}`)
});
