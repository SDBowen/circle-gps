// Methods to handle additions, deletions, requests of the device list.
// Device list holds currently connected users by socket ID. Each socket
// ID is paired with the user login ID, and user selected gps devices.

const DeviceManager = {
  deviceList: {},
  // On connect, add user socket id to device list
  onConnect: client => {
    if (!Object.prototype.hasOwnProperty.call(DeviceManager.deviceList, client)) {
      DeviceManager.deviceList[client.id] = {};
      DeviceManager.deviceList[client.id].user = undefined;
      DeviceManager.deviceList[client.id].devices = [];
    }
  },
  // On login, add user id to device list
  addUser: (clientId, userId) => {
    // ADD CHECK FOR USER ALREADY IN DEVICE LIST
    DeviceManager.deviceList[clientId].user = userId;
  },
  // Add user selected device to device list
  addDevice: (deviceId, client) => {
    // ADD HANDLE NULL CLIENT VARIABLE
    if (DeviceManager.deviceList[client].devices.indexOf(deviceId) === -1) {
      DeviceManager.deviceList[client].devices.push(deviceId);
    }
  },
  // Remove user selected device from device list
  removeDevice: (deviceId, client) => {
    // ADD HANDLE NULL CLIENT VARIABLE
    const deviceIndex = DeviceManager.deviceList[client].devices.indexOf(deviceId);

    if (deviceIndex !== -1) {
      DeviceManager.deviceList[client].devices.splice(deviceIndex, 1);
    }
  },
  // When coordinates are received, check if user is listening for device
  usersListeningForDevice: deviceId => {
    const userList = [];
    Object.keys(DeviceManager.deviceList).forEach(key => {
      DeviceManager.deviceList[key].devices.forEach(value => {
        if (value === deviceId) {
          userList.push(key);
        }
      });
    });
    return userList;
  },
  // Delete user from device list
  onDisconnect: client => {
    delete DeviceManager.deviceList[client.id];
  }
};

module.exports = DeviceManager;
