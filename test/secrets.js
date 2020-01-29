const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.should();
chai.use(chaiAsPromised);

const getSecret = require('../lib/secrets').getSecret;

describe('Secrets', async() => {
  it('Should retrieve a single value', async() => {
    const secret = await getSecret('dev/test', 'item1', 'us-west-2');
    expect(secret).to.equal('value1');
  });

  it('Should retrieve all values', async() => {
    const secret = await getSecret('dev/test');
    expect(secret).to.have.property('item1', 'value1');
    expect(secret).to.have.property('item2', 'value2');
    expect(secret).to.have.property('item3', 'value3');
    expect(secret).to.have.property('item4', 'value4');
    expect(secret).to.have.property('item5', 'value5');
    expect(secret).to.have.property('item6', 'value6');
  });

  it('Should throw an error if no secretPath is provided', () => {
    return getSecret().should.be.rejectedWith(
      /secretPath is required/,
    );
  });
});
