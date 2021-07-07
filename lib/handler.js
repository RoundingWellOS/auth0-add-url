// Known bug with rewire. Need to cast as var 
// eslint-disable-next-line no-var
var secrets = require('./secrets');
// eslint-disable-next-line no-var
var auth0tools = require('./auth0tools');
const Promise = require('bluebird');

const handler = async(event, context) => {
  if (typeof event.secretEnv === 'undefined') {
    throw new Error('secretEnv is required');
  }
  const secretEnv = event.secretEnv;
  if (typeof event.url === 'undefined') {
    throw new Error('url is required');
  }
  const url = event.url;
  const secret = await secrets.getSecret(`${ secretEnv }/env`);
  return await auth0tools.addAuth0Url(secret, url);
};

module.exports = async(event, context, cb) => {
  try {
    const result = await Promise.try(() => handler(event, context));
    cb(null);
    return result;
  } catch (err) {
    cb(err);
    throw err;
  }
};
