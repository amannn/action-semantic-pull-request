module.exports = ({env}) => {
  // Set the environment variable `LEGACY_TOKEN` when user use the legacy auth, so it can be resolved by npm CLI
  if (env.NPM_USERNAME && env.NPM_PASSWORD && env.NPM_EMAIL) {
    env.LEGACY_TOKEN = Buffer.from(`${env.NPM_USERNAME}:${env.NPM_PASSWORD}`, 'utf8').toString('base64');
  }
};
