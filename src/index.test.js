import * as core from '@actions/core';
import {beforeEach, expect, it, vi} from 'vitest';
import validatePrTitle from './validatePrTitle.js';

vi.mock('@actions/core', () => ({setFailed: vi.fn(), setOutput: vi.fn()}));
vi.mock('@actions/github', () => ({
  context: {
    payload: {
      pull_request: {
        number: 1,
        base: {user: {login: 'owner'}, repo: {name: 'repo'}}
      }
    }
  },
  getOctokit: () => ({
    rest: {pulls: {get: async () => ({data: {title: 'fix: a title'}})}}
  })
}));
vi.mock('./parseConfig.js', () => ({default: () => ({})}));
vi.mock('./validatePrTitle.js', () => ({default: vi.fn()}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

it.each([
  [new TypeError('Invalid title'), 'Invalid title', 'TypeError'],
  ['Invalid title', 'Invalid title', 'Error'],
  [new Error(), 'Semantic check failed: {}', 'Error'],
  [{status: 500}, 'Semantic check failed: {"status":500}', 'Error']
])('reports a thrown value (%j)', async (error, message, type) => {
  vi.mocked(validatePrTitle).mockRejectedValueOnce(error);

  await import('./index.js');

  expect(core.setFailed).toHaveBeenCalledWith(message);
  expect(core.setOutput).toHaveBeenCalledWith('error_message', message);
  expect(core.setOutput).toHaveBeenCalledWith('error_type', type);
});