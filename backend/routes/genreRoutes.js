const express = require('express');
const router = express.Router();
const {
    getGenre,
    updateGenre
} = require('../controllers/genreController');

router.get('/', getGenre);
router.put('/:id', updateGenre);

module.exports = router;