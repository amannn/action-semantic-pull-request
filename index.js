const core = require('@actions/core');
const github = require('@actions/github');
const validatePrTitle = require('./src/validatePrTitle');

async function run() {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);
    const contextPullRequest = github.context.payload.pull_request;
    const {data: pullRequest} = client.pulls.get({
      owner: contextPullRequest.base.user.login,
      repo: contextPullRequest.base.repo.name,
      pull_number: contextPullRequest.number
      // url: contextPullRequest.url
    });
    core.info(JSON.stringify(pullRequest));

    // TODO: This isn't up to date. use rest api?
    await validatePrTitle(contextPullRequest.title);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
