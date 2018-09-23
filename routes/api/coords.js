const express = require("express");
const socket = require("socket.io");

const router = express.Router();

const Profile = require("../../models/profile");

// @Route   GET api/coords/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "coords working" });
});

// @Route   POST api/coords
// @Desc    Receive device coordinates
// @Access  Public
router.post("/:id", (req, res) => {
  const errors = {};

  Profile.findOne({ deviceId: req.params.id }).then(device => {
    // Check database for existing device
    if (!device) {
      errors.api = "Device ID not found";
      return res.status(400).json(errors);
    }

    // Get device data
    const deviceData = {};
    deviceData.id = req.params.id;
    deviceData.lat = req.query.lat;
    deviceData.lon = req.query.lon;

    const { io } = req.app;

    io.sockets.emit("coordsUpdate", deviceData);

    res.json({
      msg: `device: ${deviceData.id} lat: ${deviceData.lat} lon: ${
        deviceData.lon
      }`
    });
  });
});

module.exports = router;
