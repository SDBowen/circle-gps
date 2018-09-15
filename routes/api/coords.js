const express = require("express");
const socket = require("socket.io");

const router = express.Router();

// @Route   GET api/coords/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "coords working" });
});

// @Route   POST api/coords
// @Desc    Receive device coordinates
// @Access  Public
router.get("/:id", (req, res) => {
  // Get device data
  const deviceData = {};
  deviceData.lat = req.query.lat;
  deviceData.lon = req.query.lon;

  res.json({
    msg: `device: ${req.params.id} lat: ${deviceData.lat} lon: ${
      deviceData.lon
    }`
  });
});

module.exports = router;
