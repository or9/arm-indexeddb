const isProduction = __isProduction();
const isDebug = __isDebug();

export default class TestRunner {
	static config = getDefaultConfig()
	// Should open a new popup window
	// 	perform assertions there
	// 	display results
	// 	could have own interface with a button to export/download results
	// 	optionally, use the main console
	// Save results to indexeddb
	// 	perform historical comparison against indexeddb
	// 	display results graph/comparison via chartjs
	// 	
	// What about spies, stubs, etc?
	constructor(config = {}) {
		this.config = {
			...this.constructor.config,
			...config,
		};

		if (isProduction && !isDebug && !this.config.debug) {
			this.assert = this.noop;
		} else {
			this.assert = this.__assert;
			// Add button to DOM to open test window?
			// open test runner popup
			// establish webworker channel
			// const busWorkerName = this.getAttribute("bus-worker");
			// this.busWorker = window[busWorkerName];
			// this.busWorker.postMessage(new ArrayBuffer(), [new ArrayBuffer()]);
		}
	}

	__assert() {
		if (this.config.failOnError === true) {
			return void console.assert(...arguments);
		}

		// console.log("trying to assert arguments", ...arguments);
		const expression = arguments[0];
		const message = [...arguments].slice(1) || `${this.config.name}`;

		try {
			console.assert(...arguments);

			if (!expression) {
				throw message;
			} else {
				// \u2705 heavy green checkmark
				// \u2713 checkmark
				console.info(`\u2705 ${message} PASS`);
			}
		} catch(err) {
			console.error(`\u274c ${message} FAIL`);			
		}
		
	}
}

function getDefaultConfig() {
	return {
		failOnError: true,
		useMainConsole: false,
	};
}

function __isProduction() {
	return [
		window.env?.PROD,
		window.env?.isProd,
		window.env?.isProduction,
	]
	.some(a => a);
}

function __isDebug() {
	return [
		window.env?.DEBUG,
		window.env?.IS_DEBUG,
		window.env?.isDebug,
	]
	.some(a => a);
}

function noop() {}
