const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {hash} = require("bcrypt");
const router = express.Router();

router.post("/signup", async (req, res) => {

  bcrypt.hash(req.body.password, 12).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user.save().then(result => {
      res.status(201).json({
        message: "User created successfully",
        user: result
      });
    }).catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
  })

})

router.post("/login", async (req, res) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Authentication failed!"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication failed!"
        });
      }
      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id,
      }, "secret_as_should_be_longer_AS42", {expiresIn: "1h"});
      res.status(200).json({
        message: "Authentication successfully!",
        token: token,
        expiresIn: 3600
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed!"
      })
    })

})

module.exports = router;
