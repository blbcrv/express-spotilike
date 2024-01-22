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
    const id = req.params.id;
    db.query(`select * from Album where id = ${id}`, (err, result) => {
        if(err) console.log(err);
        res.json(result);
    })
};

const getTracksFromAlbum = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT Track.*
              FROM Track
              WHERE Track.album_id = '${id}';`,

        (err, result) => {
            if(err) throw new Error("Error occured")
            res.json({result})
    });
};
const addAlbum = (req, res) => {
    if(!req.body.title){
        return res.status(400).send("Please write a album to add");
    }
    let album = req.body;

    db.query(`select title, artist_id from Album where title = '${album.title}' and artist_id = ${album.artist_id}`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error during check in database");
        }

        if(result.length > 0){
            return res.status(400).send("Album already exist");
        }

        else{
            let sqlReq = 'insert into Album (title, image, release_date, artist_id) VALUES (?)';
            const params = [[album.title, album.image, album.release_date, album.artist_id]];

            db.query(sqlReq, params, (err, result) => {
                if(err) {
                    console.log(err);
                    return res.status(400).send("Error during insertion");
                }
                return res.json({ message: `Album ${album.title} added !`});
            });
        }
    });
};

const updateAlbum = (req, res) => {
    const id = req.params.id;
    const album = req.body;
    const params = [album.title, album.image, album.release_date, album.artist_id, album.id];
    let sqlReq = `update Album set title = ?, image = ?, release_date = ?, artist_id = ? where id = ${id}`;

    db.query(sqlReq, params, (err, result) => {
        if (err) return console.log(err);
        return res.status(200).json({message: "Update OK"});
    })
}

const delAlbum = (req, res) => {

    const id = req.params.id;

    db.query(`delete from Album where id = ${id}`, (err) => {
        if (err) return console.log(err);
        return res.json({ message: `Album ${id} successfully deleted`});
    });
}

const addTrackInAlbum = (req, res) => {

    const id = req.params.id;
    const track = req.body;
    const params = [[track.title, track.duration, track.album_id, track.genre_id,  track.artist_id]];
    let sqlReq = `insert into Track (title, duration, album_id, genre_id, artist_id) VALUES (?)`;

    db.query(sqlReq, params, (err) => {
        if (err) return console.log(err);
        return res.status(200).send(`Track successfully added`);
    })


}

module.exports = {
    getAlbum,
    getAlbumById,
    getTracksFromAlbum,
    addAlbum,
    updateAlbum,
    delAlbum,
    addTrackInAlbum
}