require('dotenv').config({ path: '.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const socket = require('socket.io');
const DeviceManager = require('./services/deviceManager');

const profile = require('./routes/api/profile');
const user = require('./routes/api/user');
const coords = require('./routes/api/coords');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  // .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// API routes
app.use('/api/profile', profile);
app.use('/api/user', user);
app.use('/api/coords', coords);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// Start server
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {});

// Socket setup
app.io = socket(server);

// On socket action
app.io.on('connection', client => {
  DeviceManager.onConnect(client);
  client.on('addUser', clientData => {
    DeviceManager.addUser(client.id, clientData);
  });
  client.on('addDevice', clientData => {
    DeviceManager.addDevice(clientData.deviceId, client.id);
  });
  client.on('removeDevice', clientData => {
    DeviceManager.removeDevice(clientData.deviceId, client.id);
  });
  client.on('disconnect', () => {
    DeviceManager.onDisconnect(client.id);
  });

  console.log('Made socket connection', client.id);
});

// For test
module.exports = app;
