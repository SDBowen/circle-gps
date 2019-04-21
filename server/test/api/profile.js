/* eslint-env mocha */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const Profile = require('../../models/profile');

const should = chai.should();

chai.use(chaiHttp);
describe('Profiles', () => {
  const user = { user: 'Mike Smith', password: 'testing', password2: 'testing' };
  const profile = { deviceId: '12345', deviceName: 'Test Device' };

  before(done => {
    Profile.deleteMany(() => {
      chai
        .request(server)
        .post('/api/user/register')
        .send(user)
        .end((registerErr, registerRes) => {
          user.id = registerRes.body._id;
          profile.user = registerRes.body._id;

          chai
            .request(server)
            .post('/api/user/login')
            .send(user)
            .end((loginErr, loginRes) => {
              user.token = loginRes.body.token;
              done();
            });
        });
    });
  });

  describe('POST /profile', () => {
    it('should create current user profile', done => {
      chai
        .request(server)
        .post('/api/profile')
        .set('Authorization', user.token)
        .send(profile)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('user').eql(user.id);
          res.body.should.have.property('deviceId').eql(profile.deviceId);
          res.body.should.have.property('deviceName').eql(profile.deviceName);

          done();
        });
    });
  });

  describe('GET /profile', () => {
    it('should get current user profile', done => {
      chai
        .request(server)
        .get('/api/profile')
        .set('Authorization', user.token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('user');
          res.body[0].user._id.should.have.eql(user.id);
          res.body[0].user.user.should.have.eql(user.user);
          res.body[0].should.have.property('deviceId').eql(profile.deviceId);
          res.body[0].should.have.property('deviceName').eql(profile.deviceName);

          done();
        });
    });
  });
});
