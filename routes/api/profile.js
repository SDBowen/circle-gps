const express = require("express");
const passport = require("passport");

const router = express.Router();

// Load validations
const validateProfileInput = require("../../validation/profile");

// Load models
const Profile = require("../../models/profile");

// @Route   GET api/profile/
// @Desc    Get current user profile
// @Access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // Look up profile by user id
    Profile.findOne({ user: req.user.id })
      // Return user profile and include user name
      // from user model. Check for empty profile.
      .populate("user", "user")
      .then(profile => {
        if (!profile) {
          errors.noProfile = "No profile has been created";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Route   POST api/profile/
// @Desc    Add user profile to database
// @Access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Pass user input to validation
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

    // Find user profile by user id
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update if profile exists
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(updatedProfile => res.json(updatedProfile));
      } else {
        // Check if profile exists (currently only device id)
        Profile.findOne({ deviceId: profileFields.deviceId }).then(
          existingProfile => {
            if (existingProfile) {
              errors.device = "That device already exists";

              res.status(400).json(errors);
            }

            // Create new profile
            new Profile(profileFields)
              .save()
              .then(createdProfile => res.json(createdProfile));
          }
        );
      }
    });
    return null;
  }
);

module.exports = router;
