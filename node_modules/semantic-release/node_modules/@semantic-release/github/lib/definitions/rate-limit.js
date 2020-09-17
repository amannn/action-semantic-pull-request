/**
 * Default exponential backoff configuration for retries.
 */
const RETRY_CONF = {retries: 3, factor: 2, minTimeout: 1000};

/**
 * Rate limit per API endpoints.
 *
 * See {@link https://developer.github.com/v3/search/#rate-limit|Search API rate limit}.
 * See {@link https://developer.github.com/v3/#rate-limiting|Rate limiting}.
 */
const RATE_LIMITS = {
  search: ((60 * 1000) / 30) * 1.1, // 30 calls per minutes => 1 call every 2s + 10% safety margin
  core: {
    read: ((60 * 60 * 1000) / 5000) * 1.1, // 5000 calls per hour => 1 call per 720ms + 10% safety margin
    write: 3000, // 1 call every 3 seconds
  },
};

/**
 * Global rate limit to prevent abuse.
 *
 * See {@link https://developer.github.com/v3/guides/best-practices-for-integrators/#dealing-with-abuse-rate-limits|Dealing with abuse rate limits}
 */
const GLOBAL_RATE_LIMIT = 1000;

module.exports = {RETRY_CONF, RATE_LIMITS, GLOBAL_RATE_LIMIT};
