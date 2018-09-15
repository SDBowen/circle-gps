const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

// Load validations
const validateProfileInput = require("../../validation/profile");

// Load models
const Profile = require("../../models/profile");
const User = require("../../models/user");

// @Route   GET api/profile/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "profile working" });
});

// @Route   GET api/profile/
// @Desc    Get current user profile
// @Access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ login: req.login.id })
      .populate("user", ["login"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "No profile has been created";
          return res.status(404).json(errors);
        }
        res.json(profile);
        return null;
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Route   POST api/profile/
// @Desc    Add user profile
// @Access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.deviceId = req.body.deviceId;
    profileFields.deviceName = req.body.deviceName;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(updatedProfile => res.json(updatedProfile));
      } else {
        // Create

        // Check if device exists
        Profile.findOne({ deviceId: profileFields.deviceId }).then(
          existingProfile => {
            if (existingProfile) {
              errors.device = "That device already exists";

              res.status(400).json(errors);
            }

            // Save Profile
            new Profile(profileFields)
              .save()
              .then(createdProfile => res.json(createdProfile));
          }
        );
      }
    });
  }
);

module.exports = router;
