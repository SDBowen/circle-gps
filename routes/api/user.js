const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { jwtKey } = require("../../config/jwtConfig");

const router = express.Router();

// Load input validation
const validateRegistrationInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

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
  // Pass user input to validation
  const { errors, isValid } = validateRegistrationInput(req.body);

  // Check validation, return any errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ login: req.body.login }).then(user => {
    // Check database for existing user name
    if (user) {
      errors.login = "Login already exists";
      return res.status(400).json(errors);
    }

    // New user payload for database
    const newUser = new User({
      login: req.body.login,
      password: req.body.password
    });

    // Hash user password and save user to database
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
    return null;
  });
});

// @Route   GET api/user/login
// @Desc    Login user / JWT token return
// @Access  Public
router.post("/login", (req, res) => {
  // Pass user input to validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation, return any errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // User data from form input
  const { login } = req.body;
  const { password } = req.body;

  // Find user in database by login
  User.findOne({ login }).then(user => {
    // Check for user
    if (!user) {
      errors.login = "User not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT payload
        const userPayload = { id: user.id, name: user.login };

        // Sign token
        jwt.sign(userPayload, jwtKey, { expiresIn: 43200 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
        return null;
      }
      errors.password = "Incorrect password";
      return res.status(400).json(errors);
    });
    return null;
  });
});

// @Route   GET api/user/current
// @Desc    Return current user with valid token
// @Access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      login: req.user.login
    });
  }
);

module.exports = router;
