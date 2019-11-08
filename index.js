const core = require('@actions/core');
const github = require('@actions/github');
const validatePrTitle = require('./src/validatePrTitle');

async function run() {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);
    const {data: pullRequest} = client.pulls.get({
      url: github.context.payload.pull_request.url
    });
    throw new Error(JSON.stringify(pullRequest));

    // TODO: This isn't up to date. use rest api?
    await validatePrTitle(pullRequest.title);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
