const core = require('@actions/core');
const github = require('@actions/github');
const validatePrTitle = require('./src/validatePrTitle');

async function run() {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);

    // The pull request info on the context isn't up to date. When the user
    // updates the title and re-runs the workflow, it would be outdated.
    // Therefore fetch the pull request via the REST API to ensure we use the
    // current title.
    const contextPullRequest = github.context.payload.pull_request;
    const {data: pullRequest} = await client.pulls.get({
      owner: contextPullRequest.base.user.login,
      repo: contextPullRequest.base.repo.name,
      pull_number: contextPullRequest.number
    });

    await validatePrTitle(pullRequest.title);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
