# auth0-add-url
## Description
auth0-add-url is a simple utility used to add custom url's Auth0 client applications.

## Usage
The function can be invoked with a single parameter with two base keys:

```json
{
  secretEnv: `${ env }`,
  url: 'https://test.roundingwell.com',
}
```

The function updates the callbacks, web_origins, and allowed_logout_urls of the Auth0 environment defined in an AWS Secrets Manager secret.
