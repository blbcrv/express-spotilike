const db = require('../database')

const getTracksFromArtist = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT Track.*
              FROM Track
              JOIN Album ON Track.album_id = Album.id
              WHERE Album.artist_id = ${id};`,

        (err, result) => {
            if(err) throw new Error("Error occured")
            res.json({result})
        });
};

const deleteArtist = (req, res) => {
    const id = req.params.id;

    db.query(`delete from Artist where id = ${id}`, (err) => {
        if (err) return console.log(err);
        return res.status(200).send(`Artist ${id} successfully deleted`);
    });
}

const updateArtist = (req, res) => {
    const id = req.params.id;
    const sqlReq = `update Artist set name = ?, avatar = ?, biography = ? where id = ${id}`;
    const artist = req.body;
    const params = [artist.name, artist.avatar, artist.biography];

    db.query(sqlReq, params, (err)=> {
        if (err) return console.log(err);
        return res.status(200).send(`Artist ${id} successfully updated`);
    })
}

module.exports= {
    getTracksFromArtist,
    deleteArtist,
    updateArtist
}