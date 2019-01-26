const Profile = require("../models/profile");

const DataSeed = {
  demoDevices: user => {
    Profile.create(
      {
        user,
        deviceId: "ctablue",
        deviceName: "Chicago Blue Line"
      },
      {
        user,
        deviceId: "ctabus",
        deviceName: "Chicago Clark Bus"
      },
      {
        user,
        deviceId: "ladowntown",
        deviceName: "LA Downtown Bus"
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
