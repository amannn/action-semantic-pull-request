const {URL} = require('url');

module.exports = repositoryUrl => {
  const [match, auth, host, path] = /^(?!.+:\/\/)(?:(.*)@)?(.*?):(.*?)$/.exec(repositoryUrl) || [];
  try {
    const [, owner, repo] = /^\/([^/]+)?\/?(.+?)(?:\.git)?$/.exec(
      new URL(match ? `ssh://${auth ? `${auth}@` : ''}${host}/${path}` : repositoryUrl).pathname
    );
    return {owner, repo};
  } catch (_) {
    return {};
  }
};
