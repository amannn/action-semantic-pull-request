const allowedTypes = ['fix', 'feat'];

module.exports = async function validatePrTitle(prTitle) {
  const result = prTitle.match(/(\w+)!?:/);

  if (!result) {
    throw new Error(
      `No release type found in pull request title "${prTitle}".` +
        '\n\nAdd a prefix like "fix: ", "feat: " or "feat!: " to indicate what kind of release this pull request corresponds to. If your pull request is work-in-progress, you can add "[WIP]" as a prefix.'
    );
  }

  const [, type] = result;

  if (!allowedTypes.includes(type)) {
    throw new Error(
      `Unknown release type "${type}" found in pull request title "${prTitle}".` +
        `\n\nPlease use one of these recognized types: ${allowedTypes.join(
          ', '
        )}.`
    );
  }
};
