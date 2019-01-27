const Profile = require("../models/profile");

const DataSeed = {
  demoDevices: user => {
    Profile.create(
      {
        user,
        deviceId: "ctablue",
        deviceName: "Blue Line"
      },
      {
        user,
        deviceId: "cta9",
        deviceName: "Ashland"
      },
      {
        user,
        deviceId: "cta20",
        deviceName: "Madison"
      },
      {
        user,
        deviceId: "cta22",
        deviceName: "Clark"
      },
      {
        user,
        deviceId: "cta53",
        deviceName: "Pulaski"
      }
    )
      .then(devices => {
        console.log(`${devices.length} devices created`);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = DataSeed;
