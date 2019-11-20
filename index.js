const core = require('@actions/core');
const github = require('@actions/github');
const validatePrTitle = require('./src/validatePrTitle');

async function run() {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);

    // The pull request info on the context isn't up to date. When
    // the user updates the title and re-runs the workflow, it would
    // be outdated. Therefore fetch the pull request via the REST API
    // to ensure we use the current title.
    const contextPullRequest = github.context.payload.pull_request;
    const {data: pullRequest} = await client.pulls.get({
      owner: contextPullRequest.base.user.login,
      repo: contextPullRequest.base.repo.name,
      pull_number: contextPullRequest.number
    });

    // Pull requests that start with "[WIP] " are excluded from the check.
    const isWip = /^\[WIP\]\s/.test(pullRequest.title);
    const newStatus = isWip ? 'pending' : 'success';

    // https://developer.github.com/v3/repos/statuses/#create-a-status
    client.request(
      'POST /repos/:owner/:repo/statuses/:sha',
      github.context.repo({
        sha: pullRequest.head.sha,
        state: newStatus,
        target_url: 'https://github.com/amannn/action-semantic-pull-request',
        description: isWip ? 'Work in progress' : 'Ready for review',
        context: 'action-semantic-pull-request'
      })
    );

    if (!isWip) {
      await validatePrTitle(pullRequest.title);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
