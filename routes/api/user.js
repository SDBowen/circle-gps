const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Load user model
const User = require("../../models/user");

// @Route   GET api/user/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "user working" });
});

// @Route   GET api/user/register
// @Desc    Register user
// @Access  Public
router.post("/register", (req, res) => {
  User.findOne({ login: req.body.login }).then(user => {
    if (user) {
      return res.status(400).json({ user: "User already exists" });
    }

    const newUser = new User({
      login: req.body.login,
      password: req.body.password
    });

    bcrypt.genSalt(5, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (genSaltError, hash) => {
        if (genSaltError) throw genSaltError;
        newUser.password = hash;
        newUser
          .save()
          .then(returnedUser => res.json(returnedUser))
          .catch(passwordError => console.log(passwordError));
      });
    });
    return true;
  });
});

module.exports = router;
