# CircleGPS

CircleGPS provides users a platform to track GPS devices, in real-time, anywhere in the world. This is a hobby project still in its beginning stages.

## Getting Started

CircleGPS is live at [https://app.circlegps.com/dashboard].

### Demo Login

A demo login option is offered to allow users to preview the current state of the application. The account is loaded with a few devices to interact with. Coordinates for these devices come from the Chicago Transit Authority API, providing real-time coordinates from the cities buses and trains.

Users are unable to add their own devices to the demo account.

### Map Dashboard

The map dashboard displays all devices available to the account, as well as, a map to view the current location of these devices. Selecting a device will subscribe the user to begin receiving location data for that device. When subscribed to a device, its location will be presented on the map by a red pin. The initial pin may take some moments to appear, as the location needs to be received by the device. The timing of these updates is dependent on the devices settings (10 seconds for the demo account devices).

To remove a device from being tracked, select it again from the menu.

### Settings Page

The Settings page can be accessed from the Map Dashboard. Within the setting's page, a user is able to add a new device. There are two required fields to create a new device:

- **Device ID** - Unique ID to assign to the device. This ID is used when the device sends data to the CircleGPS API.
- **Device Name** - Name that will be displayed on the Map Dashboard for this device.

## CircleGPS API

To get device coordinate data, devices must be configured to send their coordinate to the CircleGPS API.

```
https://app.circlegps.com/api/coords/[deviceID]?lat=[deviceLatitude]&lon=[deviceLongitude]
```

Where \[deviceId\] is the Device ID configured in the settings page. \[deviceLatitude\] and \[deviceLongitude\] are the coordinates reported by the device.

An example of a device with ID `my-device` at latitude `43.6076894` and longitude `-116.2086713`:

```
https://app.circlegps.com/api/coords/my-device?lat=43.6076894&lon=-116.2086713
```

## Built With

- [NodeJS](https://nodejs.org/en/) - JavaScript run-time on the back-end
- [React](https://reactjs.org/) - Front-end framework
- [MongoDB](https://www.mongodb.com/) - Database

## Authors

- **Steven Bowen** - [SDBowen](https://github.com/SDBowen)

## License

This project is licensed under the GNU GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
