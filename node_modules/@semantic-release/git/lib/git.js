const execa = require('execa');
const debug = require('debug')('semantic-release:git');

/**
 * Filter files modified on the local repository.
 *
 * @param {Array<String>} files List of file paths to filter.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Array<String>} Array of modified files path.
 */
async function filterModifiedFiles(files, execaOpts) {
  return files.length > 0
    ? (await execa('git', ['ls-files', '-m', '-o', ...files], execaOpts)).stdout
        .split('\n')
        .map(file => file.trim())
        .filter(file => Boolean(file))
    : [];
}

/**
 * Add a list of file to the Git index. `.gitignore` will be ignored.
 *
 * @param {Array<String>} files Array of files path to add to the index.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 */
async function add(files, execaOpts) {
  const shell = await execa('git', ['add', '--force', '--ignore-errors', ...files], {...execaOpts, reject: false});
  debug('add file to git index', shell);
}

/**
 * Commit to the local repository.
 *
 * @param {String} message Commit message.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @throws {Error} if the commit failed.
 */
async function commit(message, execaOpts) {
  await execa('git', ['commit', '-m', message], execaOpts);
}

/**
 * Push to the remote repository.
 *
 * @param {String} origin The remote repository URL.
 * @param {String} branch The branch to push.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @throws {Error} if the push failed.
 */
async function push(origin, branch, execaOpts) {
  await execa('git', ['push', '--tags', origin, `HEAD:${branch}`], execaOpts);
}

/**
 * Get the HEAD sha.
 *
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {String} The sha of the head commit on the local repository
 */
async function gitHead(execaOpts) {
  return (await execa('git', ['rev-parse', 'HEAD'], execaOpts)).stdout;
}

module.exports = {filterModifiedFiles, add, gitHead, commit, push};
