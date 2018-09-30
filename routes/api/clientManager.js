const ClientManager = {
  deviceList: {},
  onConnect: client => {
    if (
      !Object.prototype.hasOwnProperty.call(ClientManager.deviceList, client)
    ) {
      ClientManager.deviceList[client.id] = {};
      ClientManager.deviceList[client.id].user = undefined;
      ClientManager.deviceList[client.id].devices = [];
    }
  },
  addUser: (clientId, userId) => {
    // ADD CHECK FOR USER ALREADY IN DEVICE LIST
    ClientManager.deviceList[clientId].user = userId;
    console.log(
      `clientManager.addUser: ${JSON.stringify(ClientManager.deviceList)}`
    );
  },
  addDevice: (deviceId, client) => {
    // ADD HANDLE UNDEFINED CLIENT VARIABLE
    if (ClientManager.deviceList[client].devices.indexOf(deviceId) === -1) {
      ClientManager.deviceList[client].devices.push(deviceId);
    }
    console.log(
      `clientManager.addDevice: ${JSON.stringify(ClientManager.deviceList)}`
    );
  },
  checkForActiveDevice: deviceId => {
    const userList = [];
    Object.keys(ClientManager.deviceList).forEach(key => {
      ClientManager.deviceList[key].devices.forEach(value => {
        if (value === deviceId) {
          userList.push(key);
        }
      });
    });
    console.log(`ClientManager.checkForActiveDevice: ${userList}`);
    return userList;
  },
  onDisconnect: client => {
    delete ClientManager.deviceList[client];
    console.log(
      `clientManager.onDisconnect: ${JSON.stringify(ClientManager.deviceList)}`
    );
  }
};

module.exports = ClientManager;
