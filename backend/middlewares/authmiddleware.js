const jwt = require('jsonwebtoken')
const db = require('../database')
const asyncHandler = require('express-async-handler')
const protect = asyncHandler(async (req, res, next) => {
    let token = null
    // Token sent format: "Bearer eyJhbGciOi..."
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //Récupération du user sans le mot de passe grace à l'id contenu dans le token (en mysql)
            let sqlReq = 'select * from User where id = ?';
            let params = [decoded.id];

            db.query(sqlReq, params, (err, result) => {
                if (err) return console.log(err);
                if (result.length === 0) {
                    res.status(400);
                    throw new Error('User does not exist');
                }
                const user = result[0];
                req.user = user
                next()
            });
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        } }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
module.exports = { protect }