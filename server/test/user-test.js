import "babel-core/register";
import "babel-polyfill";
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import dotenv from 'dotenv';

dotenv.config()
let token;
const { ROLEID } = process.env;
chai.use(chaiHttp);
const { expect } = chai;
describe('Role Management backend tests with postgres database for user model', () => {
  describe('tests controller that signs up a user', () => {
    it('should return code 201 with success message', (done) => {
      let sendEmail = () => console.log('it was successful');
      const sgMail = {
        send: function() {console.log('email sent')}
      }
      const sendStub = sinon.stub(sgMail, 'send').returns(true);
      chai.request(app)
        .post('/v1/user/signup')
        .send({
          firstName: 'phil',
          lastName: 'andrew',
          email: 'philnew@gmail.com',
          password: 'password',
          phone: '081660321237',
          roleId: ROLEID
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).eql('signup successful, check your mail to verify your account. Link expires in 15 mins');
          done();
        });
    });
  })
  describe('tests controller that signs in a user', () => {
    it('should return code 201 with success message', (done) => {
      chai.request(app)
        .post('/v1/user/auth')
        .send({
          email: 'philnew@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          token = res.body.token;
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.be.undefined
          done();
      });
    });
  })
  describe('tests controller that verifies in a user', () => {
    it('should return code 201 with success message', (done) => {
      chai.request(app)
        .get(`/v1/confirm?q=${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.be.undefined
          done();
      });
    });
  })
});
