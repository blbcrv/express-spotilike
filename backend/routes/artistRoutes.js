const express = require('express');
const router = express.Router();
const {
    getAllArtists,
    getTracksFromArtist,
    deleteArtist,
    updateArtist,
    getArtistById,
   getAlbumFromArtist
} = require("../controllers/artistController");
const {protect} = require('../middlewares/authmiddleware');

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.get('/:id/albums', getAlbumFromArtist);
router.get('/:id/songs', getTracksFromArtist);
router.put('/:id', updateArtist);
router.delete('/:id', protect, deleteArtist);

module.exports = router;