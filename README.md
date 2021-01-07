# action-semantic-pull-request

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title matches the [Conventional Commits spec](https://www.conventionalcommits.org/).

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release) with the Conventional Commits preset. When using the "Squash and merge" strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message and subsequently the expected release.

## Validation

Examples for valid PR titles:
- fix: Correct typo.
- feat: Add support for Node 12.
- refactor!: Drop support for Node 6.
- feat(ui): Add `Button` component.

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
      - uses: amannn/action-semantic-pull-request@v2.1.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        # Optionally, you can provide options for further constraints.
        with:
          # Configure which types are allowed.
          # Default: https://github.com/commitizen/conventional-commit-types
          types: |
            fix
            feat
          # Configure which scopes are allowed.
          scopes: |
            core
            ui
          # Configure that a scope must always be provided.
          requireScope: true
          # Configure additional validation for the subject based on a regex.
          # This example forbids starting subjects with an uppercase character.
          subjectPattern: ^(?![A-Z]).+$
```

## Event triggers

There are two events that can be used as triggers for this action, each with different characteristics:

1. [`pull_request_target`](https://github.blog/2020-08-03-github-actions-improvements-for-fork-and-pull-request-workflows/): This allows the action to be used in a fork-based workflow, where e.g. you want to accept pull requests in a public repository. In this case, the configuration from the main branch of your repository will be used for the check. This means that you need to have this configuration in the main branch for the action to run at all (e.g. it won't run within a PR that adds the action initially). Also if you change configuration in a PR, the changes will not be reflected for the current PR – only subsequent ones after the changes are in the main branch.
2. `pull_request`: This configuration uses the latest configuration that is available in the current branch. It will only work if the branch is based in the repository itself. If this configuration is used and a pull request from a fork is opened, you'll encounter an error as the Github token environment parameter is not available.
