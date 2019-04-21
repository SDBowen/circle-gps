/* eslint-env mocha */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

const io = require('socket.io-client');
const { expect } = require('chai');
const server = require('../../index');

const DeviceManager = require('../../services/deviceManager');

describe('Device Manager', () => {
  describe('Device List', () => {
    const clientOne = { id: 'jGfcBbQjfKyeVY9PAONE' };
    const userOne = 'sdbowen';
    const deviceOne = 'testDeviceOne';

    it('adds client on connection', done => {
      DeviceManager.onConnect(clientOne);

      expect(DeviceManager.deviceList).to.have.property(clientOne.id);
      done();
    });
    it('removes client on disconnect', done => {
      DeviceManager.onConnect(clientOne);
      DeviceManager.onDisconnect(clientOne);
      expect(DeviceManager.deviceList).be.empty;
      done();
    });
    it('Adds user on user login', done => {
      DeviceManager.onConnect(clientOne);
      DeviceManager.addUser(clientOne.id, userOne);

      expect(DeviceManager.deviceList[clientOne.id].user).to.equal(userOne);
      done();
    });
    it('Adds user selected device', done => {
      DeviceManager.onConnect(clientOne);
      DeviceManager.addUser(clientOne.id, userOne);
      DeviceManager.addDevice(deviceOne, clientOne.id);

      expect(DeviceManager.deviceList[clientOne.id].devices).to.have.members([deviceOne]);
      done();
    });
    it('Removes user selected device', done => {
      DeviceManager.onConnect(clientOne);
      DeviceManager.addUser(clientOne.id, userOne);
      DeviceManager.addDevice(deviceOne, clientOne.id);
      DeviceManager.removeDevice(deviceOne, clientOne.id);

      expect(DeviceManager.deviceList[clientOne.id].devices).to.not.have.members([deviceOne]);
      done();
    });
  });
});
