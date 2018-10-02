const express = require("express");

const { usersListeningForDevice } = require("../../routes/api/clientManager");

const router = express.Router();

const Profile = require("../../models/profile");

// @Route   POST api/coords/:id
// @Desc    Receive coordinates from device
// @Access  Public
router.post("/:id", (req, res) => {
  const { io } = req.app;
  const errors = {};

  Profile.findOne({ deviceId: req.params.id }).then(device => {
    // Check database for device Id, returns error if not found
    if (!device) {
      errors.api = "Device ID not found";
      return res.status(400).json(errors);
    }

    // Find users listening for incoming device coordinates
    const activeUsersSocketId = usersListeningForDevice(req.params.id);

    if (Array.isArray(activeUsersSocketId) && activeUsersSocketId.length) {
      // Create device id and coordinates payload
      const deviceData = {};
      deviceData.id = req.params.id;
      deviceData.lat = req.query.lat;
      deviceData.lon = req.query.lon;

      // For each user with device active, send updated coordinates
      activeUsersSocketId.forEach(user => {
        io.to(user).emit("coordsUpdate", deviceData);
        console.log(`activeUsersSocketId: ${user}`);
      });
    }
    return null;
  });
});

module.exports = router;
