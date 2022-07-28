const Express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

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

module.exports = router;