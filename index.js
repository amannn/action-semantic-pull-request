const core = require('@actions/core');
const github = require('@actions/github');
const validatePrTitle = require('./src/validatePrTitle');

async function run() {
  try {
    await validatePrTitle(github.context.payload.pull_request.title);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
