const core = require('@actions/core');
const github = require('@actions/github');
const parser = require('conventional-commits-parser');

console.log(JSON.stringify(github.context.payload.pull_request));
// function parser (raw, options, regex) {

core.setFailed('Action failed with error`);
