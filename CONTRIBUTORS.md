# Contributors

Thank you very much for contributing to this project!

Due to the way event triggers work with GitHub actions it's a bit harder to test your changes.

Simple changes that can be unit tested can be implemented with the regular workflow where you fork the repo and create a pull request. Note however that the new version of the action won't be executed in the workflows of this repository. We have to rely on the unit tests in this case.

If e.g. environment parameters are changed, the action should be tested end-to-end in a workflow.

To do this, please follow this process:

1. Fork the repo.
2. Create a PR in **your own repo**.
3. The "Lint PR title preview (current branch)" workflow will run the new version and will help you validate the change.
4. Create a PR to this repo with the changes. In this case the preview workflow will fail, but we'll know that it works since you tested it in the fork. Please include a link to a workflow where you tested the current state of this pull request.
5. Don't run `npm run build` to update the `dist` folder as it will be generated on CI during the build
