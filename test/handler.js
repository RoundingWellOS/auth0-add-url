const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.should();
chai.use(chaiAsPromised);

const rewire = require('rewire');
const sinon = require('sinon');

const handler = rewire('../lib/handler');

describe('Handler', () => {
  const context = {};
  const cb = sinon.spy();
  const mockGetSecretSuccess = (secretPath, key = 'all', region = 'us-west-2') => {
    return Promise.resolve({
      Auth0ClientDomain: 'secret',
      Auth0MgmtApiClientId: 'secret',
      Auth0MgmtApiSecret: 'secret',
      Auth0ClientID: 'secret',
    });
  };

  const mockAddAuth0UrlSuccess = (credentials, url) => {
    return Promise.resolve('success');
  };

  const makeMockHandler = ({ mockGetSecret, mockAddAuth0Url } = {}) => {
    mockGetSecret = mockGetSecret || mockGetSecretSuccess;
    mockAddAuth0Url = mockAddAuth0Url || mockAddAuth0UrlSuccess;
    const secretSpy = sinon.spy(mockGetSecret);
    const auth0Spy = sinon.spy(mockAddAuth0Url);
    handler.__set__('secrets.getSecret', secretSpy);
    handler.__set__('auth0tools.addAuth0Url', auth0Spy);
    
    return {
      secretSpy,
      auth0Spy,
    };
  };

  it('should throw an error if secretEnv is not defined', () => {
    return handler({ url: 'https://test.roundingwell.com' }, context, cb).should.be.rejectedWith(
      /secretEnv is required/,
    );
  });

  it('should throw an error if url is not defined', () => {
    return handler({ secretEnv: 'test' }, context, cb).should.be.rejectedWith(
      /url is required/,
    );
  });

  it('should add urls', () => {
    const mockEvent = {
      secretEnv: 'test',
      url: 'test',
    };
    const { secretSpy, auth0Spy } = makeMockHandler();

    return handler(mockEvent, context, cb)
      .then(result => {
        expect(secretSpy.calledOnce).to.be.true;
        expect(auth0Spy.calledOnce).to.be.true;
      });
  });
});
