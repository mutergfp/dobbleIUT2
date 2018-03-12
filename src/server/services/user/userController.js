const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

exports.register = (req, res) => {
    let newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save()
        .then(user => {
            user.hash_password = undefined;
            res.json(user);
        })
        .catch(err => res.status(400).json({
            message: err
        }));
}

exports.login = (req, res) => {
    User.findOne({
      email: req.body.email,
      username: req.body.username
    })
    .then(user => {
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ 
                message: 'Authentication failed. Invalid user or password.' 
            });
        }
        return res.json({ 
            token: jwt.sign({ 
                email: user.email, 
                username: user.username, 
                _id: user._id 
            }, 'secret_key') 
        });
    })
    .catch(console.error);
};

// not used
exports.loginRequired = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'You are not logged in !'
        });
    }
    next();
};

exports.decodeJWT = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'secret_key', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    } 
}

exports.isLoggedIn = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            isLoggedIn: false
        });
    }
    res.json({
        isLoggedIn: true
    });
}
