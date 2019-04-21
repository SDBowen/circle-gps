const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load validations
const validateProfileInput = require('../../validation/profile');

// Load models
const Profile = require('../../models/profile');

// @Route   GET api/profile/
// @Desc    Get current user profile
// @Access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  // Look up profile by user id
  Profile.find({ user: req.user.id })
    // Return user profile and include user name
    // from user model. Check for empty profile.
    .populate('user', 'user')
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'No profile has been created';
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @Route   POST api/profile/
// @Desc    Add new device to database
// @Access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Pass user input to validation
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  if (req.user.id === '5c4f928282994a0017c08e6f') {
    // Return any errors with 400 status
    errors.device = 'Demo login can not add new devices';

    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.deviceId = req.body.deviceId;
  profileFields.deviceName = req.body.deviceName;

  // Check if device id exists
  Profile.findOne({
    deviceId: profileFields.deviceId,
    user: profileFields.user
  }).then(existingProfile => {
    if (existingProfile) {
      errors.device = 'That device already exists';

      return res.status(400).json(errors);
    }

    // Create new device
    new Profile(profileFields).save().then(createdProfile => res.json(createdProfile));
    return null;
  });
  return null;
});

module.exports = router;
