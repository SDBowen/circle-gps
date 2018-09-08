// Make connection
var socket = io.connect("http://localhost:4000");

// Query DOM
var deviceId = document.getElementById("device-id"),
  deviceName = document.getElementById("device-name"),
  submitBtn = document.getElementById("submit-btn"),
  deviceOutput = document.getElementById("device-output");

// Emit events

// Submit new device to server on submit
submitBtn.addEventListener("click", function() {
  socket.emit("addDevice", {
    id: deviceId.value,
    name: deviceName.value
  });
});

// Listen for events

// Display new devices as they are received from the server
socket.on("addDevice", function(serverDeviceData) {
  deviceOutput.innerHTML +=
    "<p><strong>" +
    serverDeviceData.id +
    ": </strong>" +
    serverDeviceData.name +
    "</p>";
});
