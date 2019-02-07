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
        deviceId: "ctared",
        deviceName: "Red Line"
      },
      // {
      //   user,
      //   deviceId: "cta4",
      //   deviceName: "Cottage Grove"
      // },
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
      // {
      //   user,
      //   deviceId: "cta34",
      //   deviceName: "South Michigan"
      // },
      {
        user,
        deviceId: "cta49",
        deviceName: "Western"
      },
      // {
      //   user,
      //   deviceId: "cta55",
      //   deviceName: "Garfield"
      // },
      // {
      //   user,
      //   deviceId: "cta53",
      //   deviceName: "Pulaski"
      // },
      // {
      //   user,
      //   deviceId: "cta60",
      //   deviceName: "Blue Island"
      // },
      {
        user,
        deviceId: "cta62",
        deviceName: "Archer"
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
