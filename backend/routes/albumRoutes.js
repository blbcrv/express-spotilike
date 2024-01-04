const express = require('express');
const router = express.Router();
const {
    getAlbum,
    getTracksFromAlbum,
    delAlbum,
    updateAlbum,
    addAlbum
} = require('../controllers/albumController')

router.get('/', getAlbum);
router.get('/:id/tracks', getTracksFromAlbum);
router.post('/', addAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', delAlbum);

module.exports = router