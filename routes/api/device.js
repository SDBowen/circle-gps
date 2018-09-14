const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

// Load models
const Device = require("../../models/device");
const User = require("../../models/user");

// @Route   GET api/device/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "device working" });
});

// @Route   GET api/device/
// @Desc    Get current user devices
// @Access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Device.findOne({ login: req.login.id })
      .then(device => {
        if (!device) {
          errors.noDevice = "No devices have been created";
          return res.status(404).json(errors);
        }
        res.json(device);
        return null;
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
