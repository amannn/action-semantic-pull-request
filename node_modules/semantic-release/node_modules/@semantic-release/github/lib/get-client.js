const {memoize, get} = require('lodash');
const {Octokit} = require('@octokit/rest');
const pRetry = require('p-retry');
const Bottleneck = require('bottleneck');
const urljoin = require('url-join');
const HttpProxyAgent = require('http-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');

const {RETRY_CONF, RATE_LIMITS, GLOBAL_RATE_LIMIT} = require('./definitions/rate-limit');

/**
 * Http error status for which to not retry.
 */
const SKIP_RETRY_CODES = new Set([400, 401, 403]);

/**
 * Create or retrieve the throttler function for a given rate limit group.
 *
 * @param {Array} rate The rate limit group.
 * @param {String} limit The rate limits per API endpoints.
 * @param {Bottleneck} globalThrottler The global throttler.
 *
 * @return {Bottleneck} The throller function for the given rate limit group.
 */
const getThrottler = memoize((rate, globalThrottler) =>
  new Bottleneck({minTime: get(RATE_LIMITS, rate)}).chain(globalThrottler)
);

module.exports = ({githubToken, githubUrl, githubApiPathPrefix, proxy}) => {
  const baseUrl = githubUrl && urljoin(githubUrl, githubApiPathPrefix);
  const globalThrottler = new Bottleneck({minTime: GLOBAL_RATE_LIMIT});
  const github = new Octokit({
    auth: `token ${githubToken}`,
    baseUrl,
    request: {
      agent: proxy
        ? baseUrl && new URL(baseUrl).protocol.replace(':', '') === 'http'
          ? new HttpProxyAgent(proxy)
          : new HttpsProxyAgent(proxy)
        : undefined,
    },
  });

  github.hook.wrap('request', (request, options) => {
    const access = options.method === 'GET' ? 'read' : 'write';
    const rateCategory = options.url.startsWith('/search') ? 'search' : 'core';
    const limitKey = [rateCategory, RATE_LIMITS[rateCategory][access] && access].filter(Boolean).join('.');

    return pRetry(async () => {
      try {
        return await getThrottler(limitKey, globalThrottler).wrap(request)(options);
      } catch (error) {
        if (SKIP_RETRY_CODES.has(error.status)) {
          throw new pRetry.AbortError(error);
        }

        throw error;
      }
    }, RETRY_CONF);
  });

  return github;
};
