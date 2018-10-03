// Methods to handle additions, deletions, requests of the device list.
// Device list holds currently connected users by socket ID. Each socket
// ID is paired with the user login ID, and user selected gps devices.

const DeviceManager = {
  deviceList: {},
  // On connect, add user socket id to device list
  onConnect: client => {
    if (
      !Object.prototype.hasOwnProperty.call(DeviceManager.deviceList, client)
    ) {
      DeviceManager.deviceList[client.id] = {};
      DeviceManager.deviceList[client.id].user = undefined;
      DeviceManager.deviceList[client.id].devices = [];
    }
  },
  // On login, add user id to device list
  addUser: (clientId, userId) => {
    // ADD CHECK FOR USER ALREADY IN DEVICE LIST
    DeviceManager.deviceList[clientId].user = userId;
    console.log(
      `DeviceManager.addUser: ${JSON.stringify(DeviceManager.deviceList)}`
    );
  },
  // Add user selected device to device list
  addDevice: (deviceId, client) => {
    // ADD HANDLE NULL CLIENT VARIABLE
    if (DeviceManager.deviceList[client].devices.indexOf(deviceId) === -1) {
      DeviceManager.deviceList[client].devices.push(deviceId);
    }
    console.log(
      `DeviceManager.addDevice: ${JSON.stringify(DeviceManager.deviceList)}`
    );
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
    console.log(`DeviceManager.checkForActiveDevice: ${userList}`);
    return userList;
  },
  // Delete user from device list
  onDisconnect: client => {
    delete DeviceManager.deviceList[client];
    console.log(
      `DeviceManager.onDisconnect: ${JSON.stringify(DeviceManager.deviceList)}`
    );
  }
};

module.exports = DeviceManager;
