const db = require('../database')

const getGenre = (req, res) => {
    db.query("select * from Genre", (err, result) => {
        if(err) {
            res.status(500)
            throw new Error("Erreur sur la requête en base")
        }
        res.json({ result })
    })
};

const updateGenre= (req, res) => {
    const id = req.params.id;
    const genre = req.body;
    const params = [genre.title, genre.description];
    let sqlReq = `update Genre set title = ?, description = ? where id = ${id}`;

    db.query(sqlReq, params, (err) => {
        if (err) return console.log(err);
        return res.status(200).json({message: "Update OK"});
    });
};

module.exports = {
    getGenre,
    updateGenre
}