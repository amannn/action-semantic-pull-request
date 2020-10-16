const {promises: fs} = require("fs");
const core = require("@actions/core");
const { types } = require("conventional-commit-types");

const loadConfig = async () => {
  const defaultConfig = { types };
  let userConfig = {};
  const path = core.getInput("config");
  if (path) userConfig = await fs.readFile(path, "utf8");

  return {...defaultConfig, ...userConfig };
};

loadConfig().catch((err) => core.setFailed(err.message));

module.exports = loadConfig;
