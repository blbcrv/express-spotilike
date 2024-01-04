const express = require('express');
const router = express.Router();
const {
    getAlbum,
    getAlbumById,
    getTracksFromAlbum,
    delAlbum,
    updateAlbum,
    addAlbum
} = require('../controllers/albumController')

router.get('/', getAlbum);
router.get('/:id', getAlbumById);
router.get('/:id/tracks', getTracksFromAlbum);
router.post('/', addAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', delAlbum);

module.exports = router