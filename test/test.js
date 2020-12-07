var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../src/server');

var should = chai.should();
chai.use(chaiHttp);

describe('oAuth2', function () {

  it('should get a bearer token', function (done) {
    chai.request(server)
      .post('/v1/authenticate')
      .send({
        "username": "serious_business",
        "password": "suchPassw0rdSecure"
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('accessToken');
        res.body.should.have.property('expiresIn');
        done();
      });
  });

});

