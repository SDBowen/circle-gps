const DeviceManager = {
  deviceList: {},
  onConnect: client => {
    if (
      !Object.prototype.hasOwnProperty.call(DeviceManager.deviceList, client)
    ) {
      DeviceManager.deviceList[client.id] = {};
      DeviceManager.deviceList[client.id].user = undefined;
      DeviceManager.deviceList[client.id].devices = [];
    }
  },
  addUser: (clientId, userId) => {
    // ADD CHECK FOR USER ALREADY IN DEVICE LIST
    DeviceManager.deviceList[clientId].user = userId;
    console.log(
      `DeviceManager.addUser: ${JSON.stringify(DeviceManager.deviceList)}`
    );
  },
  addDevice: (deviceId, client) => {
    // ADD HANDLE UNDEFINED CLIENT VARIABLE
    if (DeviceManager.deviceList[client].devices.indexOf(deviceId) === -1) {
      DeviceManager.deviceList[client].devices.push(deviceId);
    }
    console.log(
      `DeviceManager.addDevice: ${JSON.stringify(DeviceManager.deviceList)}`
    );
  },
  // When coordinates are received, check if device is selected by active users
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
  onDisconnect: client => {
    delete DeviceManager.deviceList[client];
    console.log(
      `DeviceManager.onDisconnect: ${JSON.stringify(DeviceManager.deviceList)}`
    );
  }
};

module.exports = DeviceManager;
