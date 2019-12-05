import "babel-core/register";
import "babel-polyfill";
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import { v4 } from "uuid";

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
        .post('/v1/signup')
        .send({
          firstName: 'phil',
          lastName: 'andrew',
          email: 'philnew@gmail.com',
          password: 'password',
          phone: '08166035057',
          roleId: v4()
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).eql('signup successful, check your mail to verify your account');
          done();
        });
    });
  })
});
