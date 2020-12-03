const {ISSUE_ID} = require('./definitions/constants');

module.exports = async (github, title, owner, repo) => {
  const {
    data: {items: issues},
  } = await github.search.issuesAndPullRequests({
    q: `in:title+repo:${owner}/${repo}+type:issue+state:open+${title}`,
  });

  return issues.filter((issue) => issue.body && issue.body.includes(ISSUE_ID));
};
