const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const { newToken } = require("../../middleware/checkAuth");
const User = require("../../model/user");
// const checkAuth = require('../../middleware/checkAuth');

// router.post('/login',(req, res, next) => {
//     User.find({
//         email: req.body.email
//     })
//     .exec()
//     .then(user => {
//         if(user.length < 1) {
//             return res.status(404).json({
//                 message: "메일이 없어요"
//             })
//         }
//         bcrypt.compare(req.body.password, user[0].password, (err, rs) => {
//             if(err) {
//                 return res.status(404).json({
//                     message: "메일이 없어요"
//                 });
//             }
//             if(rs) {
//                const token = jwt.sign({
//                     email: user[0].email,
//                     userId: user[0]._id
//                 },
//                 process.env.JWT_KEY,
//                 {
//                     expiresIn: "1h"
//                 }
//                 )
//                 res.cookie('token', token);
//                 console.log(token);
//                 return res.status(200).json({
//                     message: "로그인",
//                     token: token
//                 });
//             }
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         return res.status(500).json({
//             error1: err
//         });
//     })
// });

// router.post('/signup', (req, res, next) => {
//     User.find({email: req.body.email})
//     .exec()
//     .then(user => {
//         if (user.length >= 1) {
//             return res.status(422).json({
//                 error: "mail exists"
//             })
//         } else {
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 if (err) {
//                     return res.status(500).json({
//                         error: err
//                     });
//                 } else {
//                     const user = new User({
//                         _id: new mongoose.Types.ObjectId(),
//                         email: req.body.email,
//                         password : hash,
//                     });
//                     user
//                     .save()
//                     .then( result => {
//                         console.log(result);
//                         res.status(201).json({
//                             message: 'User created'
//                         });
//                     })
//                     .catch( err => {
//                         return res.status(500).json({
//                             error1: err
//                         });
//                     });
//                 }
//             });
//         }
//     })
//     .catch()

// })

// router.delete('/:userId', (req, res, next) => {
//     User.remove({_id: req.params.id})
//     .exec()
//     .then(res => {
//         res.status(200).json({
//             message: 'user delete'
//         })
//     })
//     .catch();
// })

router.post("/login", (req, res) => {
  // find the user
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // non registered user
      if (!user) {
        res.status(401).send("Authentication failed. User not found.");
      }
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) {
          res.status(500).send("Internal Server Error");
        }
        if (result) {
          // create token with user info
          const token = newToken(user);

          // current logged-in user
          const loggedInUser = {
            email: user.email,
          };

          // return the information including token as JSON
          res.status(200).json({
            success: true,
            user: loggedInUser,
            message: "Login Success",
            token: token,
          });
        } else {
          res.status(401).json("Authentication failed. Wrong password.");
        }
      });
    })
    .catch((error) => {
      res.status(500).json("Internal Server Error");
      throw error;
    });
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  // encrypt password
  // NOTE: 10 is saltround which is a cost factor
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    } else {
      const newUser = new User({
        email,
        password: hashedPassword,
      });
      newUser.save((error, saved) => {
        if (error) {
          console.log(error);
          res.status(409).send(error);
        } else {
          console.log(saved);
          res.send(saved);
        }
      });
    }
  });
});

module.exports = router;
