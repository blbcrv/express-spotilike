const express = require('express');
const router = express.Router();
const {
    getAlbum,
    getAlbumById,
    getTracksFromAlbum,
    delAlbum,
    updateAlbum,
    addAlbum,
    addTrackInAlbum
} = require('../controllers/albumController');

router.get('/', getAlbum);
router.get('/:id', getAlbumById);
router.get('/:id/songs', getTracksFromAlbum);
router.post('/:id/songs', addTrackInAlbum);
router.post('/', addAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', delAlbum);

module.exports = router