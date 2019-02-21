const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const User = require('../../models/user');

const should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
  before(done => {
    User.deleteMany({}, err => {
      done();
    });
  });
  describe('POST /register', () => {
    it('should create a new user', done => {
      const user = { user: 'John Smith', password: 'testing', password2: 'testing' };

      chai
        .request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('user').eql(user.user);
          res.body.should.have.property('password');
          done();
        });
    });

    it('should return any data validation errors', done => {
      const user = { user: '', password: '', password2: '' };

      chai
        .request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          res.body.should.have.property('password');
          res.body.should.have.property('password2');
          done();
        });
    });

    it('should prevent duplicate user names', done => {
      const user = { user: 'John Smith', password: 'testing', password2: 'testing' };

      chai
        .request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('user').eql('User already exists');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should allow existing users to login', done => {
      const user = { user: 'John Smith', password: 'testing' };

      chai
        .request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('token');
          done();
        });
    });

    it('should return any data validation errors', done => {
      const user = { user: '', password: '' };

      chai
        .request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          res.body.should.have.property('password');
          done();
        });
    });

    it('should return non-existing account notice', done => {
      const user = { user: 'NotRegistered', password: 'password' };

      chai
        .request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('user').eql('User not found');
          done();
        });
    });
  });
});
