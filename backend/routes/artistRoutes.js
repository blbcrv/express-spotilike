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

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.get('/:id/albums', getAlbumFromArtist);
router.get('/:id/songs', getTracksFromArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router;