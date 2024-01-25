const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const db = require('../database');

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    let sqlReq;
    let params ;

    params = [username, email];
    sqlReq = 'select * from User where username = ? or email = ?';

    db.query(sqlReq, params, (err, result) => {
        if (err) return console.log(err);
        if (result.length > 0) {
            res.status(400);
            throw new Error('User already exists');
        }
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    params = [username, email, hashedPassword];
    sqlReq = 'insert into User (username, email, password) values (?, ?, ?)';

    db.query(sqlReq, params, (err) => {
        if (err) return console.log(err);
        res.status(201).json({message: "User registered", username: username, email: email, password: hashedPassword});
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    let sqlReq;
    let params;

    params = [username];
    sqlReq = 'select * from User where username = ?';

    db.query(sqlReq, params, (err, result) => {
        if (err) return console.log(err);
        if (result.length === 0) {
            res.status(400);
            throw new Error('User does not exist');
        }
        const user = result[0];
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400);
            throw new Error('Invalid credentials');
        }
        const token = generateToken(user.id);
        res.status(200).json({message: "User logged in", token: token});
    });
});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ userData : {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
        }});
});

module.exports = {
    registerUser,
    loginUser,
    getMe
}