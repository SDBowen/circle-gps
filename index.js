var express = require("express");
var socket = require("socket.io");

// App setup
var app = express();
const port = process.env.PORT || 4000;
var server = app.listen(port, function() {
  console.log(`Listening for requests on port ${port}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
var io = socket(server);

// On socket connection
io.on("connection", function(socket) {
  console.log("Made socket connection", socket.id);

  //  Receive new device from client and update
  //  and connected clients with new device
  socket.on("addDevice", function(clientDeviceData) {
    io.sockets.emit("addDevice", clientDeviceData);
  });
});

app.post("/api/", function(req, res) {
  io.sockets.emit("coordUpdate", data);
});
