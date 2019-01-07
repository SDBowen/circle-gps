const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const socket = require("socket.io");
const DeviceManager = require("./services/deviceManager");

const profile = require("./routes/api/profile");
const user = require("./routes/api/user");
const coords = require("./routes/api/coords");

const app = express();

// Body parser moddleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/dbConfig").mongoURI;
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

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/profile", profile);
app.use("/api/user", user);
app.use("/api/coords", coords);

// Start server
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server listening for requests on port ${port}`);
});

// Socket setup
app.io = socket(server);

// On socket connection
app.io.on("connection", client => {
  DeviceManager.onConnect(client);
  client.on("addUser", clientData => {
    DeviceManager.addUser(client.id, clientData);
  });
  client.on("addDevice", clientData => {
    DeviceManager.addDevice(clientData.deviceId, client.id);
  });
  client.on("disconnect", () => {
    DeviceManager.onDisconnect(client.id);
  });

  console.log("Made socket connection", client.id);
});
