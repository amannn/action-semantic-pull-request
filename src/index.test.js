import {afterEach, beforeEach, expect, it, vi} from 'vitest';

const mocks = vi.hoisted(() => ({
  core: {
    info: vi.fn(),
    setFailed: vi.fn(),
    setOutput: vi.fn()
  },
  github: {
    context: {payload: {}},
    getOctokit: vi.fn()
  }
}));

vi.mock('@actions/core', () => mocks.core);
vi.mock('@actions/github', () => mocks.github);

const contextPullRequest = {
  number: 1,
  base: {user: {login: 'owner'}, repo: {name: 'repo'}}
};

function setup({commits = [], title}) {
  mocks.github.context.payload = {pull_request: contextPullRequest};
  mocks.github.getOctokit.mockReturnValue({
    rest: {
      pulls: {
        get: vi.fn().mockResolvedValue({
          data: {title, labels: [], head: {sha: 'sha'}}
        }),
        listCommits: vi.fn()
      }
    },
    paginate: {
      iterator: async function* iterator() {
        yield {data: commits};
      }
    },
    request: vi.fn()
  });
}

function commit(message) {
  return {commit: {message}, parents: [{}]};
}

async function run() {
  // `src/index.js` invokes the action via top-level `await`
  await import('./index.js');
}

function expectFailure(message) {
  expect(mocks.core.setFailed).toHaveBeenCalledWith(message);
  expect(mocks.core.setOutput).toHaveBeenLastCalledWith(
    'error_message',
    message
  );
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

it('succeeds without setting `error_message` for a valid title', async () => {
  setup({title: 'fix: Bug'});
  await run();
  expect(mocks.core.setFailed).not.toHaveBeenCalled();
  expect(mocks.core.setOutput).not.toHaveBeenCalledWith(
    'error_message',
    expect.anything()
  );
});

it('sets `error_message` when the PR title is invalid', async () => {
  setup({title: 'Fix bug'});
  await run();
  expectFailure(
    expect.stringContaining(
      'No release type found in pull request title "Fix bug".'
    )
  );
});

it('sets `error_message` when not invoked for a pull request', async () => {
  mocks.github.context.payload = {};
  await run();
  expectFailure(
    "This action can only be invoked in `pull_request_target` or `pull_request` events. Otherwise the pull request can't be inferred."
  );
});

it('sets `error_message` to the outer error when the single commit is not semantic', async () => {
  vi.stubEnv('INPUT_VALIDATESINGLECOMMIT', 'true');
  setup({title: 'fix: Bug', commits: [commit('Bug')]});
  await run();
  expectFailure(
    expect.stringContaining(
      "Pull request has only one commit and it's not semantic"
    )
  );
});

it('sets `error_message` when the single commit does not match the PR title', async () => {
  vi.stubEnv('INPUT_VALIDATESINGLECOMMIT', 'true');
  vi.stubEnv('INPUT_VALIDATESINGLECOMMITMATCHESPRTITLE', 'true');
  setup({title: 'fix: Bug', commits: [commit('fix: Other bug')]});
  await run();
  expectFailure(
    expect.stringContaining('The pull request has only one (non-merge) commit')
  );
});
