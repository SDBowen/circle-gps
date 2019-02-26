/* eslint-env mocha */
/* eslint-disable no-unused-vars */

const io = require('socket.io-client');
const { expect } = require('chai');
const server = require('../../index');

const DeviceManager = require('../../services/deviceManager');

let socket = null;

describe('Device Manager', () => {
  beforeEach(done => {
    // connect io clients
    socket = io.connect('http://localhost:4000/');
    socket.on('connect', () => {
      done();
    });
  });
  afterEach(done => {
    // disconnect io clients after each test
    if (socket.connected) {
      socket.disconnect();
    }

    done();
  });

  describe('Device List', () => {
    it('adds clients on connection', done => {
      expect(DeviceManager.deviceList).to.include.keys(socket.id);
      done();
    });
    it('removes clients on disconnect', done => {
      expect(DeviceManager.deviceList).to.include.keys('');
      done();
    });
  });
});
