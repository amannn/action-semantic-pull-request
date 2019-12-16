# action-semantic-pull-request

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title matches the [Conventional Commits spec](https://www.conventionalcommits.org/). The allowed types are reduced to `fix` and `feature` though.

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release) with the Conventional Commits preset. When using the "Squash and merge" strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

## Example

```yml
name: "Lint PR"
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: tools-aoeur/action-semantic-pull-request@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Examples for valid PR titles:
- fix: Correct typo.
- feat: Add support for Node 12.

Note that since PR titles only have a single line, you have to use the `!` syntax for breaking changes.

See [Conventional Commits](https://www.conventionalcommits.org/) for more examples.

Additionally, the special `[WIP] ` prefix is supported, to indicate that a pull request is work in progress and isn't ready to be merged. In this case the PR title isn't validated and the pull request checks remain pending.
