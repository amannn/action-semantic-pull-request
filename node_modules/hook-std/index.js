'use strict';

const hook = (stream, options, transform) => {
	if (typeof options !== 'object') {
		transform = options;
		options = {};
	}

	options = {
		silent: true,
		once: false,
		...options
	};

	let unhookFunction;

	const promise = new Promise(resolve => {
		const {write} = stream;

		const unhook = () => {
			stream.write = write;
			resolve();
		};

		stream.write = (output, encoding, callback) => {
			const callbackReturnValue = transform(String(output), unhook);

			if (options.once) {
				unhook();
			}

			if (options.silent) {
				return typeof callbackReturnValue === 'boolean' ? callbackReturnValue : true;
			}

			let returnValue;
			if (typeof callbackReturnValue === 'string') {
				returnValue = typeof encoding === 'string' ? Buffer.from(callbackReturnValue).toString(encoding) : callbackReturnValue;
			}

			returnValue = returnValue || (Buffer.isBuffer(callbackReturnValue) ? callbackReturnValue : output);

			return write.call(stream, returnValue, encoding, callback);
		};

		unhookFunction = unhook;
	});

	promise.unhook = unhookFunction;

	return promise;
};

const hookStd = (options, transform) => {
	const streams = options.streams || [process.stdout, process.stderr];
	const streamPromises = streams.map(stream => hook(stream, options, transform));

	const promise = Promise.all(streamPromises);
	promise.unhook = () => {
		for (const streamPromise of streamPromises) {
			streamPromise.unhook();
		}
	};

	return promise;
};

hookStd.stdout = (...arguments_) => hook(process.stdout, ...arguments_);
hookStd.stderr = (...arguments_) => hook(process.stderr, ...arguments_);

module.exports = hookStd;
