const express = require('express');
const router = express.Router();
const {
    getTracksFromArtist,
    deleteArtist,
    updateArtist
} = require("../controllers/artistController");

router.get('/:id/songs', getTracksFromArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router;