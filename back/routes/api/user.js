const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require('../../model/user');

router.post('/login', (req, res, next) => {
    User.find({
        email: req.body.email
    })
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(404).json({
                message: "메일이 없어요"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, rs) => {
            if(err) {
                return res.status(404).json({
                    message: "메일이 없어요"
                });
            }
            if(rs) {
               const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                )
                res.cookie('token', token);
                return res.status(200).json({
                    message: "로그인",
                    token: token
                });
            }
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error1: err
        });
    })
});

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                error: "mail exists"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password : hash,
                    });
                    user
                    .save()
                    .then( result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch( err => {
                        return res.status(500).json({
                            error1: err
                        });
                    });
                }
            });
        }
    })
    .catch()
    
})

router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.id})
    .exec()
    .then(res => {
        res.status(200).json({
            message: 'user delete'
        })
    })
    .catch();
})

module.exports = router