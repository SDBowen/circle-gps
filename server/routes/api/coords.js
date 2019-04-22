const express = require('express');

const router = express.Router();

// Load services
const { usersListeningForDevice } = require('../../services/deviceManager');

// @Route   POST api/coords/:id
// @Desc    Receive coordinates from device and relay to client
// @Access  Public
router.post('/:id', (req, res) => {
  // Socket.io used for emit
  const { io } = req.app;

  // Find users listening for incoming coordinates
  const activeUsers = usersListeningForDevice(req.params.id);

  // If active users, create payload
  if (Array.isArray(activeUsers) && activeUsers.length) {
    const deviceData = {};

    deviceData.id = req.params.id;
    deviceData.lat = req.query.lat;
    deviceData.lon = req.query.lon;

    // Send updated coordinates to active users
    activeUsers.forEach(user => {
      io.to(user).emit('coordsUpdate', deviceData);
      console.log(`activeUsersSocketId: ${user}`);
    });
  }
  return res.status(204).end();
});

module.exports = router;
