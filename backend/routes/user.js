const bcrypt = require("bcrypt");
const express = require("express");
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

module.exports = router;
