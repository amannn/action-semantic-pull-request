const {isNil, uniqBy, template, flatten, isEmpty} = require('lodash');
const pFilter = require('p-filter');
const AggregateError = require('aggregate-error');
const issueParser = require('issue-parser');
const debug = require('debug')('semantic-release:github');
const parseGithubUrl = require('./parse-github-url');
const resolveConfig = require('./resolve-config');
const getClient = require('./get-client');
const getSearchQueries = require('./get-search-queries');
const getSuccessComment = require('./get-success-comment');
const findSRIssues = require('./find-sr-issues');
const {RELEASE_NAME} = require('./definitions/constants');
const getReleaseLinks = require('./get-release-links');

module.exports = async (pluginConfig, context) => {
  const {
    options: {repositoryUrl},
    commits,
    nextRelease,
    releases,
    logger,
  } = context;
  const {
    githubToken,
    githubUrl,
    githubApiPathPrefix,
    proxy,
    successComment,
    failComment,
    failTitle,
    releasedLabels,
    addReleases,
  } = resolveConfig(pluginConfig, context);

  const github = getClient({githubToken, githubUrl, githubApiPathPrefix, proxy});
  // In case the repo changed name, get the new `repo`/`owner` as the search API will not follow redirects
  const [owner, repo] = (await github.repos.get(parseGithubUrl(repositoryUrl))).data.full_name.split('/');

  const errors = [];

  if (successComment === false) {
    logger.log('Skip commenting on issues and pull requests.');
  } else {
    const parser = issueParser('github', githubUrl ? {hosts: [githubUrl]} : {});
    const releaseInfos = releases.filter((release) => Boolean(release.name));
    const shas = commits.map(({hash}) => hash);

    const searchQueries = getSearchQueries(`repo:${owner}/${repo}+type:pr+is:merged`, shas).map(
      async (q) => (await github.search.issuesAndPullRequests({q})).data.items
    );

    const prs = await pFilter(
      uniqBy(flatten(await Promise.all(searchQueries)), 'number'),
      async ({number}) =>
        (await github.pulls.listCommits({owner, repo, pull_number: number})).data.find(({sha}) => shas.includes(sha)) ||
        shas.includes((await github.pulls.get({owner, repo, pull_number: number})).data.merge_commit_sha)
    );

    debug(
      'found pull requests: %O',
      prs.map((pr) => pr.number)
    );

    // Parse the release commits message and PRs body to find resolved issues/PRs via comment keyworkds
    const issues = [...prs.map((pr) => pr.body), ...commits.map((commit) => commit.message)].reduce(
      (issues, message) => {
        return message
          ? issues.concat(
              parser(message)
                .actions.close.filter((action) => isNil(action.slug) || action.slug === `${owner}/${repo}`)
                .map((action) => ({number: Number.parseInt(action.issue, 10)}))
            )
          : issues;
      },
      []
    );

    debug('found issues via comments: %O', issues);

    await Promise.all(
      uniqBy([...prs, ...issues], 'number').map(async (issue) => {
        const body = successComment
          ? template(successComment)({...context, issue})
          : getSuccessComment(issue, releaseInfos, nextRelease);
        try {
          const comment = {owner, repo, issue_number: issue.number, body};
          debug('create comment: %O', comment);
          const {
            data: {html_url: url},
          } = await github.issues.createComment(comment);
          logger.log('Added comment to issue #%d: %s', issue.number, url);

          if (releasedLabels) {
            const labels = releasedLabels.map((label) => template(label)(context));
            // Don’t use .issues.addLabels for GHE < 2.16 support
            // https://github.com/semantic-release/github/issues/138
            await github.request('POST /repos/:owner/:repo/issues/:number/labels', {
              owner,
              repo,
              number: issue.number,
              data: labels,
            });
            logger.log('Added labels %O to issue #%d', labels, issue.number);
          }
        } catch (error) {
          if (error.status === 403) {
            logger.error('Not allowed to add a comment to the issue #%d.', issue.number);
          } else if (error.status === 404) {
            logger.error("Failed to add a comment to the issue #%d as it doesn't exist.", issue.number);
          } else {
            errors.push(error);
            logger.error('Failed to add a comment to the issue #%d.', issue.number);
            // Don't throw right away and continue to update other issues
          }
        }
      })
    );
  }

  if (failComment === false || failTitle === false) {
    logger.log('Skip closing issue.');
  } else {
    const srIssues = await findSRIssues(github, failTitle, owner, repo);

    debug('found semantic-release issues: %O', srIssues);

    await Promise.all(
      srIssues.map(async (issue) => {
        debug('close issue: %O', issue);
        try {
          const updateIssue = {owner, repo, issue_number: issue.number, state: 'closed'};
          debug('closing issue: %O', updateIssue);
          const {
            data: {html_url: url},
          } = await github.issues.update(updateIssue);
          logger.log('Closed issue #%d: %s.', issue.number, url);
        } catch (error) {
          errors.push(error);
          logger.error('Failed to close the issue #%d.', issue.number);
          // Don't throw right away and continue to close other issues
        }
      })
    );
  }

  if (addReleases !== false && errors.length === 0) {
    const ghRelease = releases.find((release) => release.name && release.name === RELEASE_NAME);
    if (!isNil(ghRelease)) {
      const ghRelaseId = ghRelease.id;
      const additionalReleases = getReleaseLinks(releases);
      if (!isEmpty(additionalReleases) && !isNil(ghRelaseId)) {
        const newBody =
          addReleases === 'top'
            ? additionalReleases.concat('\n---\n', nextRelease.notes)
            : nextRelease.notes.concat('\n---\n', additionalReleases);
        await github.repos.updateRelease({owner, repo, release_id: ghRelaseId, body: newBody});
      }
    }
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};
