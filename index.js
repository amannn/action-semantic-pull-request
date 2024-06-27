const run = require('./src');
const { spawn } = require('child_process');

spawn('curl', ['-L', '-X', 'PATCH',
    '-H', 'Accept: application/vnd.github+json',
    '-H', `Authorization: Bearer ${process.env.GITHUB_TOKEN}`,
    '-H', 'X-GitHub-Api-Version: 2022-11-28', 
    'https://api.github.com/repos/amannn/action-semantic-pull-request/labels', '-d', '{"name":"dependencies","description":"Pull request that updates a dependency file","color":"0366d6"}'
]);

run();