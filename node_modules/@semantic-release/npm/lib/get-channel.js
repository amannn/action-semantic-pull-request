const semver = require('semver');

module.exports = (channel) => (channel ? (semver.validRange(channel) ? `release-${channel}` : channel) : 'latest');
