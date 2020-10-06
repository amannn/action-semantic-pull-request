const core = require("@actions/core");
const github = require("@actions/github");
const validatePrTitle = require("./validatePrTitle");

module.exports = async function run() {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);

    const contextPullRequest = github.context.payload.pull_request;
    if (!contextPullRequest) {
      throw new Error(
        "This action can only be invoked in `pull_request_target` or `pull_request` events. Otherwise the pull request can't be inferred."
      );
    }

    const owner = contextPullRequest.base.user.login;
    const repo = contextPullRequest.base.repo.name;

    // The pull request info on the context isn't up to date. When
    // the user updates the title and re-runs the workflow, it would
    // be outdated. Therefore fetch the pull request via the REST API
    // to ensure we use the current title.
    const { data: pullRequest } = await client.pulls.get({
      owner,
      repo,
      pull_number: contextPullRequest.number,
    });

    // Pull requests that start with "[WIP] " are excluded from the check.
    const isWip = /^\[WIP\]\s/.test(pullRequest.title);

    let validationError;
    if (!isWip) {
      try {
        await validatePrTitle(pullRequest.title);
      } catch (error) {
        validationError = error;
      }
    }

    const newStatus = isWip || validationError != null ? "pending" : "success";

    // When setting the status to "pending", the checks don't
    // complete. This can be used for WIP PRs in repositories
    // which don't support draft pull requests.
    // https://developer.github.com/v3/repos/statuses/#create-a-status
    await client.request("POST /repos/:owner/:repo/statuses/:sha", {
      owner,
      repo,
      sha: pullRequest.head.sha,
      state: newStatus,
      target_url: "https://github.com/tools-aoeur/action-semantic-pull-request",
      description: isWip
        ? 'This PR is marked with "[WIP]".'
        : validationError
        ? "PR title validation failed"
        : "Ready for review & merge.",
      context: "action-semantic-pull-request",
    });

    if (!isWip && validationError) {
      throw validationError;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
