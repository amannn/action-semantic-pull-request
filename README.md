# action-semantic-pull-request

This is a [GitHub Action](https://github.com/features/actions) that ensures your PR title matches the [Conventional Commits spec](https://www.conventionalcommits.org/).

The typical use case is to use this in combination with a tool like [semantic-release](https://github.com/semantic-release/semantic-release) to automate releases.

## Validation

Examples for valid PR titles:
- fix: Correct typo.
- feat: Add support for Node 12.
- refactor!: Drop support for Node 6.
- feat(ui): Add `Button` component.

Note that since PR titles only have a single line, you have to use the `!` syntax for breaking changes.

See [Conventional Commits](https://www.conventionalcommits.org/) for more examples.

## Installation

1. If your goal is to create squashed commits that will be used for automated releases, you'll want to configure your GitHub repository to [use the squash & merge strategy](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests) and tick the option "Default to PR title for squash merge commits".
2. [Add the action](https://docs.github.com/en/actions/quickstart) with the following configuration
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
    name: Validate PR title
    runs-on: ubuntu-latest
    steps:
      - uses: amannn/action-semantic-pull-request@v4
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Configuration

The action works without configuration, however you can provide options for customization. You can either use inputs to pass the configuration, or add a `.github/semantic.json` file to your repository. The action inputs will override the configuration file. Lists will be appended.

The following terminology helps to understand the configuration options:

```
feat(ui): Add `Button` component.
^    ^    ^
|    |    |__ Subject
|    |_______ Scope
|____________ Type
```

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
          # Configure which scopes are disallowed in PR titles. For instance by setting
          # the value below, `chore(release): ...` and `ci(e2e,release): ...` will be rejected.
          disallowScopes: |
            release
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
          # If you use GitHub Enterprise, you can set this to the URL of your server
          githubBaseUrl: https://github.myorg.com/api/v3
          # If the PR contains one of these labels, the validation is skipped.
          # Multiple labels can be separated by newlines.
          # If you want to rerun the validation when labels change, you might want
          # to use the `labeled` and `unlabeled` event triggers in your workflow.
          ignoreLabels: |
            bot
            ignore-semantic-pull-request
          # If you're using a format for the PR title that differs from the traditional Conventional
          # Commits spec, you can use these options to customize the parsing of the type, scope and
          # subject. The `headerPattern` should contain a regex where the capturing groups in parentheses
          # correspond to the parts listed in `headerPatternCorrespondence`.
          # See: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#headerpattern
          headerPattern: '^(\w*)(?:\(([\w$.\-*/ ]*)\))?: (.*)$'
          headerPatternCorrespondence: type, scope, subject
          # For work-in-progress PRs you can typically use draft pull requests 
          # from GitHub. However, private repositories on the free plan don't have 
          # this option and therefore this action allows you to opt-in to using the 
          # special "[WIP]" prefix to indicate this state. This will avoid the 
          # validation of the PR title and the pull request checks remain pending.
          # Note that a second check will be reported if this is enabled.
          wip: true
```

## Event triggers

There are two events that can be used as triggers for this action, each with different characteristics:

1. [`pull_request_target`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target): This allows the action to be used in a fork-based workflow, where e.g. you want to accept pull requests in a public repository. In this case, the configuration from the main branch of your repository will be used for the check. This means that you need to have this configuration in the main branch for the action to run at all (e.g. it won't run within a PR that adds the action initially). Also if you change the configuration in a PR, the changes will not be reflected for the current PR – only subsequent ones after the changes are in the main branch.
2. [`pull_request`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request): This configuration uses the latest configuration that is available in the current branch. It will only work if the branch is based in the repository itself. If this configuration is used and a pull request from a fork is opened, you'll encounter an error as the GitHub token environment parameter is not available. This option is viable if all contributors have write access to the repository.

## Legacy configuration

When using "Squash and merge" on a PR with only one commit, GitHub will suggest using that commit message instead of the PR title for the merge commit and it's easy to commit this by mistake. To help out in this situation this action supports two configuration options. However, [GitHub has introduced an option to streamline this behaviour](https://github.blog/changelog/2022-05-11-default-to-pr-titles-for-squash-merge-commit-messages/), so using that instead should be preferred.

```yml
          # If the PR only contains a single commit, the action will validate that
          # it matches the configured pattern.
          validateSingleCommit: true
          # Related to `validateSingleCommit` you can opt-in to validate that the PR
          # title matches a single commit to avoid confusion.
          validateSingleCommitMatchesPrTitle: true
```