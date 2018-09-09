const express = require("express");
const socket = require("socket.io");

const api = require("./routes/api");

// App setup
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("/public/index");
});

// Use routes
app.use("/api", api);

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

// app.post("/api/", function(req, res) {
// res.send("testing");
// var data = "test";
// io.sockets.emit("coordUpdate", data);
// });
