var auth0 = require('auth0');
const ManagementClient = auth0.ManagementClient;

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
    const mgmt = new ManagementClient({
      domain: credentials.Auth0ClientDomain,
      clientId: credentials.Auth0MgmtApiClientId,
      clientSecret: credentials.Auth0MgmtApiSecret,
    });
    const client = await mgmt.getClient({
      client_id: credentials.Auth0ClientID,
    });
    return mgmt.updateClient(
      {
        client_id: credentials.Auth0ClientID,
      },
      {
        callbacks: client.callbacks.concat([`${ url }/authenticated`]),
        web_origins: client.web_origins.concat([url]),
        allowed_logout_urls: client.allowed_logout_urls.concat([url]),
      },
    ).then(result => {
      return result;
    });
  },
};
