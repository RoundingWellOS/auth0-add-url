const SecretsManager = require('aws-sdk').SecretsManager;

module.exports = {
  async getSecret(secretPath, key = 'all', region = 'us-west-2') {
    if (secretPath === undefined) {
      throw new Error('secretPath is required');
    }
    const mgr = new SecretsManager({
      region,
    });
    const payload = {
      SecretId: secretPath,
    };
    const data = await mgr.getSecretValue(payload).promise();
    const secret = JSON.parse(data.SecretString);
    if (key === 'all') {
      return secret;
    }
    return secret[key];
  },
};
