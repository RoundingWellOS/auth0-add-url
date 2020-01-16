const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.should();
chai.use(chaiAsPromised);

const rewire = require('rewire');
const sinon = require('sinon');

const auth0tools = rewire('../lib/auth0tools.js');

describe('Auth0tools', () => {
  it('should throw an error if Auth0ClientDomain is not supplied', () => {
    return auth0tools.addAuth0Url({}, '').should.be.rejectedWith(
      /Auth0ClientDomain is required in the credentials parameter/,
    );
  });
  it('should throw an error if Auth0MgmtApiClientId is not supplied', () => {
    const credentials = {
      Auth0ClientDomain: 'test',
    };
    return auth0tools.addAuth0Url(credentials, '').should.be.rejectedWith(
      /Auth0MgmtApiClientId is required in the credentials parameter/,
    );
  });
  it('should throw an error if Auth0MgmtApiSecret is not supplied', () => {
    const credentials = {
      Auth0ClientDomain: 'test',
      Auth0MgmtApiClientId: 'test',
    };
    return auth0tools.addAuth0Url(credentials, '').should.be.rejectedWith(
      /Auth0MgmtApiSecret is required in the credentials parameter/,
    );
  });
  it('should throw an error if Auth0ClientID is not supplied', () => {
    const credentials = {
      Auth0ClientDomain: 'test',
      Auth0MgmtApiClientId: 'test',
      Auth0MgmtApiSecret: 'test',
    };
    return auth0tools.addAuth0Url(credentials, '').should.be.rejectedWith(
      /Auth0ClientID is required in the credentials parameter/,
    );
  });
  it('should throw an error if url is not supplied', () => {
    const credentials = {
      Auth0ClientDomain: 'test',
      Auth0MgmtApiClientId: 'test',
      Auth0MgmtApiSecret: 'test',
      Auth0ClientID: 'test',
    };
    return auth0tools.addAuth0Url(credentials).should.be.rejectedWith(
      /url is required/,
    );
  });
});
