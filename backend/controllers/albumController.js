const db = require('../database')

const getAlbum = (req, res) => {
    db.query("select * from Album", (err, result) => {
        if(err) {
            res.status(500)
            throw new Error("Erreur sur la requête en base")
        }
        res.json({ result })
    })
}

const getAlbumById = (req, res) => {
    db.query(`select * from Album where id = ${req.params.id}`, (err, result) => {
        if(err) console.log(err)
        res.json(result)
    })
}

const getTracksFromAlbum = (req, res) => {
    db.query(`select Track.*
             from Track
             join Album_tracks on Track.id = Album_tracks.track_id
             where Album_tracks.album_id = '${req.params.id}'`,

        (err, result) => {
            if(err) throw new Error("Error occured")
            res.json({result})
    })
}
const addAlbum = (req, res) => {
    if(!req.body.name){
        res.status(400);
        throw new Error("Please write a album to add");
    }
    res.json({ message: "Add Album"})
}

const updateAlbum = (req, res) => {
    res.json({ message: "Update Albums"})
}

const delAlbum = (req, res) => {
    res.json({ message: "Delete Albums"})
}

module.exports = {
    getAlbum,
    getAlbumById,
    getTracksFromAlbum,
    addAlbum,
    updateAlbum,
    delAlbum
}