const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");

const device = require("./routes/api/device");
const user = require("./routes/api/user");

// App setup
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});

// DB config
const db = require("./config/dbConfig").mongoLocal;
const { options } = require("./config/dbConfig");

// Connect to DB
mongoose
  .connect(
    db,
    options
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("/public/index");
});

// Use routes
app.use("/api/device", device);
app.use("/api/user", user);

// Socket setup
const io = socket(server);

// On socket connection
io.on("connection", currentSocket => {
  console.log("Made socket connection", currentSocket.id);

  //  Receive new device from client and update
  //  and connected clients with new device
  socket.on("addDevice", clientDeviceData => {
    io.sockets.emit("addDevice", clientDeviceData);
  });
});
