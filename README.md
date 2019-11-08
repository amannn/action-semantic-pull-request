# action-semantic-pull-request

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title matches the [Conventional Commits spec](https://www.conventionalcommits.org/).

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release) with the Conventional Commits preset. When using the "Squash and merge" strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

## Example

```yml
name: "Lint PR"
on:
  pull_request:
    types:
      - opened
      - edited

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: amannn/action-semantic-pull-request@v1.1.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
