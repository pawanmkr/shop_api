const Express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = Express.Router();

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then((user) => {
        console.log(user);
        if (user.length > 0) {
            res.status(409).json({
                message: 'email already exists'
            })
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        err: Error
                    });
                }
                else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201);
                            res.send("user created");
                        })
                        .catch(err => {
                            res.send(500).json({
                                err: error
                            });
                        })
                }
            });
        }
    })
})

router.post('/login',
    (req, res, next) => {
        User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                    if (err) {
                        return res.status(401).json({
                            message: 'Either Email or Password is Wrong'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({ email: user[0].email, userId: user[0]._id },
                        `${process.env.JWT_KEY}` , { expiresIn: '1h' });

                        return res.status(200).json({
                            message: 'Login Succesfull',
                            token: token
                        });
                    }
                    res.status(404).json({
                        message: "Either Email or Password is Wrong"
                    });
                });
            }
            else {
                res.status(401);
                res.send('Either Email or Password is Wrong');
            }
        })
        .catch(err => {
            res.status(500).json({
                err: error
            });
        })
    }
);

module.exports = router;