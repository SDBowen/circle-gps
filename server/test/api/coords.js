/* eslint-env mocha */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const should = chai.should();

chai.use(chaiHttp);
describe('Coordinates', () => {
  const deviceData = { id: '12345', lat: '41.8781', lon: '87.6298' };

  describe('POST /coords', () => {
    it('should accept coordinates', done => {
      chai
        .request(server)
        .post(`/api/coords/${deviceData.id}?lat=${deviceData.lat}&lon=${deviceData.lon}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
