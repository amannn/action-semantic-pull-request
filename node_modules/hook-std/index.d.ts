/// <reference types="node"/>

declare namespace hookStd {
	/**
	`unhook()` method which, when called, unhooks from a stream and resolves the Promise.
	*/
	type Unhook = () => void;

	/**
	@param output - String from stream output.
	@param unhook - Method which, when called, unhooks from stream.
	@returns A Buffer or string to modify the value in the stream.
	*/
	type Transform = (
		output: string,
		unhook: Unhook
	) => Buffer | string | void;

	/**
	@param output - String from stream output.
	@param unhook - Method which, when called, unhooks from stream.
	@returns A boolean to influence the return value of `.write(…)`.
	*/
	type SilentTransform = (
		output: string,
		unhook: Unhook
	) => boolean | void;

	interface Options {
		/**
		Automatically unhooks after the first call.

		@default false
		*/
		readonly once?: boolean;

		/**
		Suppress stdout/stderr output.

		@default true
		*/
		readonly silent?: boolean;
	}

	interface StreamsOptions extends Options {
		/**
		Writable streams to hook. This can be useful for libraries allowing users to configure a Writable Stream to write to.

		@default [process.stdout, process.stderr]
		*/
		readonly streams?: NodeJS.WritableStream[];
	}

	interface SilentFalseOptions extends Options {
		/**
		Suppress stdout/stderr output.

		@default true
		*/
		readonly silent: false;
	}

	interface SilentTrueOptions extends Options {
		/**
		Suppress stdout/stderr output.

		@default true
		*/
		readonly silent?: true;
	}

	interface StreamsSilentFalseOptions extends StreamsOptions {
		/**
		Suppress stdout/stderr output.

		@default true
		*/
		readonly silent: false;
	}

	interface StreamsSilentTrueOptions extends StreamsOptions {
		/**
		Suppress stdout/stderr output.

		@default true
		*/
		readonly silent?: true;
	}

	/**
	Promise with a `unhook()` method which, when called, resolves the Promise with an empty result.
	*/
	interface HookPromise extends Promise<void> {
		unhook: Unhook;
	}
}

declare const hookStd: {
	/**
	Hooks streams in options or stdout & stderr if none are specified.

	@returns A `Promise` with a `unhook()` method which, when called, unhooks the streams and resolves the `Promise`.
	*/
	(transform: hookStd.SilentTransform): hookStd.HookPromise;
	(
		options: hookStd.StreamsSilentFalseOptions,
		transform: hookStd.Transform
	): hookStd.HookPromise;
	(
		options: hookStd.StreamsSilentTrueOptions,
		transform: hookStd.SilentTransform
	): hookStd.HookPromise;

	/**
	Hooks stdout.

	@returns A `Promise` with a `unhook()` method which, when called, unhooks the streams and resolves the `Promise`.

	@example
	```
	import * as assert from 'assert';
	import hookStd = require('hook-std');

	(async () => {
		const promise = hookStd.stdout(output => {
			promise.unhook();
			assert.strictEqual(output.trim(), 'unicorn');
		});

		console.log('unicorn');
		await promise;
	})();

	// You can also unhook using the second `transform` method parameter:
	(async () => {
		const promise = hookStd.stdout((output, unhook) => {
			unhook();
			assert.strictEqual(output.trim(), 'unicorn');
		});

		console.log('unicorn');
		await promise;
	})();
	```
	*/
	stdout(transform: hookStd.SilentTransform): hookStd.HookPromise;
	stdout(
		options: hookStd.SilentFalseOptions,
		transform: hookStd.Transform
	): hookStd.HookPromise;
	stdout(
		options: hookStd.SilentTrueOptions,
		transform: hookStd.SilentTransform
	): hookStd.HookPromise;

	/**
	Hooks stderr.

	@returns A `Promise` with a `unhook()` method which, when called, unhooks the streams and resolves the `Promise`.
	*/
	stderr(transform: hookStd.SilentTransform): hookStd.HookPromise;
	stderr(
		options: hookStd.SilentFalseOptions,
		transform: hookStd.Transform
	): hookStd.HookPromise;
	stderr(
		options: hookStd.SilentTrueOptions,
		transform: hookStd.SilentTransform
	): hookStd.HookPromise;
};

export = hookStd;
