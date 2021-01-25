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
      - uses: amannn/action-semantic-pull-request@v3.1.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Configuration

The action works without configuration, however you can provide options for customization.

```yml
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
          # This example ensures the subject doesn't start with an uppercase character.
          subjectPattern: ^(?![A-Z]).+$
          # If `subjectPattern` is configured, you can use this property to override
          # the default error message that is shown when the pattern doesn't match.
          # The variables `subject` and `title` can be used within the message.
          subjectPatternError: |
            The subject "{subject}" found in the pull request title "{title}"
            didn't match the configured pattern. Please ensure that the subject
            doesn't start with an uppercase character.
          # For work-in-progress PRs you can typically use draft pull requests 
          # from Github. However, private repositories on the free plan don't have 
          # this option and therefore this action allows you to opt-in to using the 
          # special "[WIP]" prefix to indicate this state. This will avoid the 
          # validation of the PR title and the pull request checks remain pending.
          # Note that a second check will be reported if this is enabled.
          wip: true
```

## Event triggers

There are two events that can be used as triggers for this action, each with different characteristics:

1. [`pull_request_target`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target): This allows the action to be used in a fork-based workflow, where e.g. you want to accept pull requests in a public repository. In this case, the configuration from the main branch of your repository will be used for the check. This means that you need to have this configuration in the main branch for the action to run at all (e.g. it won't run within a PR that adds the action initially). Also if you change the configuration in a PR, the changes will not be reflected for the current PR – only subsequent ones after the changes are in the main branch.
2. [`pull_request`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request): This configuration uses the latest configuration that is available in the current branch. It will only work if the branch is based in the repository itself. If this configuration is used and a pull request from a fork is opened, you'll encounter an error as the Github token environment parameter is not available. This option is viable if all contributors have write access to the repository.
