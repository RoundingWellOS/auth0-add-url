const auth0 = require('auth0');
const ManagementClient = auth0.ManagementClient;
const isurl = require('isurl');

module.exports = {
  async addAuth0Url(credentials, url) {

    if (typeof credentials.Auth0ClientDomain === 'undefined') {
      throw new Error('Auth0ClientDomain is required in the credentials parameter');
    }
    if (typeof credentials.Auth0MgmtApiClientId === 'undefined') {
      throw new Error('Auth0MgmtApiClientId is required in the credentials parameter');
    }
    if (typeof credentials.Auth0MgmtApiSecret === 'undefined') {
      throw new Error('Auth0MgmtApiSecret is required in the credentials parameter');
    }
    if (typeof credentials.Auth0ClientID === 'undefined') {
      throw new Error('Auth0ClientID is required in the credentials parameter');
    }
    if (typeof url === 'undefined') {
      throw new Error('url is required');
    }
    
    const protoRegex = /^((http|https):\/\/)/;
    if (!protoRegex.test(url)) {
      url = `https://${ url }`;
    }
    if (!isurl(new URL(url))) {
      throw new Error(`${ url } is not a valid url`);
    }

    const mgmt = new ManagementClient({
      domain: credentials.Auth0ClientDomain,
      clientId: credentials.Auth0MgmtApiClientId,
      clientSecret: credentials.Auth0MgmtApiSecret,
    });
    const client = await mgmt.getClient({
      client_id: credentials.Auth0ClientID,
    });
    // Array <--> Set swapparoo to remove duplicates :tophat:
    const callbacks = [...new Set(client.callbacks.concat([`${ url }/authenticated`]))];
    const web_origins = [...new Set(client.web_origins.concat([url]))];
    const allowed_logout_urls = [...new Set(client.allowed_logout_urls.concat([url]))];
    return mgmt.updateClient(
      {
        client_id: credentials.Auth0ClientID,
      },
      {
        callbacks,
        web_origins,
        allowed_logout_urls,
      },
    ).then(result => {
      return result;
    });
  },
};
