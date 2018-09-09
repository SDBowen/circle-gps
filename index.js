var express = require("express");
var socket = require("socket.io");

const api = require("./routes/api");

// App setup
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, function() {
  console.log(`Listening for requests on port ${port}`);
});

app.get("/", function(req, res) {
  res.send("/public/index");
});

// Use routes
app.use("/api", api);

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

// app.post("/api/", function(req, res) {
// res.send("testing");
// var data = "test";
// io.sockets.emit("coordUpdate", data);
// });
