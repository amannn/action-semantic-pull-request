# action-semantic-pull-request

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title matches the [Conventional Commits spec](https://www.conventionalcommits.org/).

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release) with the Conventional Commits preset. When using the "Squash and merge" strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

## Validation

Examples for valid PR titles:
- fix: Correct typo.
- feat: Add support for Node 12.
- refactor!: Drop support for Node 6.

Note that since PR titles only have a single line, you have to use the `!` syntax for breaking changes.

See [Conventional Commits](https://www.conventionalcommits.org/) for more examples.

### Work in progress

Github has support for [draft pull requests](https://github.blog/2019-02-14-introducing-draft-pull-requests/), which will disable the merge button until the PR is marked as ready for merge.

However, [this feature might be disabled for your repository](https://github.community/t/draft-pull-requests-not-available/1753/7). In this case you can use the special `[WIP] ` prefix to indicate that a pull request is work in progress and isn't ready to be merged. This will avoid the validation of the PR title and the pull request checks remain pending.

## Example config

```yml
name: "Lint PR"
on:
  pull_request_target:
    types:
      - opened
      - edited
      - synchronize

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: tools-aoeur/action-semantic-pull-request@v1.4.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Note the usage of [`pull_request_target`](https://github.blog/2020-08-03-github-actions-improvements-for-fork-and-pull-request-workflows/) as the event trigger is necessary for a fork-based workflow so the API token is valid for status reporting.
