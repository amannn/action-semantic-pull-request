# hook-std [![Build Status](https://travis-ci.org/sindresorhus/hook-std.svg?branch=master)](https://travis-ci.org/sindresorhus/hook-std)

> Hook and modify stdout and stderr


## Install

```
$ npm install hook-std
```


## Usage

```js
const assert = require('assert');
const hookStd = require('hook-std');

(async () => {
	const promise = hookStd.stdout(output => {
		promise.unhook();
		assert.strictEqual(output.trim(), 'unicorn');
	});

	console.log('unicorn');
	await promise;
})();
```

You can also unhook using the second `transform` method parameter:

```js
(async () => {
	const promise = hookStd.stdout((output, unhook) => {
		unhook();
		assert.strictEqual(output.trim(), 'unicorn');
	});

	console.log('unicorn');
	await promise;
})();
```


## API

### hookStd([options], transform)

Hook streams in [streams option](#streams), by default stdout and stderr.

Returns a `Promise` with a `unhook()` method which, when called, unhooks both stdout and stderr and resolves the `Promise` with an empty result.

### hookStd.stdout([options], transform)

Hook stdout.

Returns a `Promise` with a `unhook()` method which, when called, resolves the `Promise` with an empty result.

### hookStd.stderr([options], transform)

Hook stderr.

Returns a `Promise` with a `unhook()` method which, when called, resolves the `Promise` with an empty result.

#### options

Type: `Object`

##### silent

Type: `boolean`<br>
Default: `true`

Suppress stdout/stderr output.

##### once

Type: `boolean`<br>
Default: `false`

Automatically unhooks after the first call.

##### streams

Type: `stream.Writable[]`<br>
Default: `[process.stdout, process.stderr]`

[Writable streams](https://nodejs.org/api/stream.html#stream_writable_streams) to hook. This can be useful for libraries allowing users to configure a Writable Stream to write to.

#### transform

Type: `Function`

Receives stdout/stderr as the first argument and the unhook method as the second argument. Return a string to modify it. Optionally, when in silent mode, you may return a `boolean` to influence the return value of `.write(...)`.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
