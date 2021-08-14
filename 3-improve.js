'use strict';

const assert = require('assert').strict;

// Convert IP string to number
//  ip <string> - IP address
// Returns: <number>
const ipToInt = ip => {
	if (typeof ip !== 'string') throw Error('String expected');
	if (ip === '') throw Error('Empty is not allowed');
	const parts = ip.split('.');
	if (parts.length !== 4) throw Error('Wrong IPv4 format');
	const nums = parts.map(n => parseInt(n, 10));
	if (nums.includes(NaN)) throw Error('Wrong IPv4 format');
	return nums.reduce((res, item) => (res << 8) + item);
}

// Tests

const testLocalhost = () => {
	// ['127', '0', '0', '1']
	// 0 << 8 = 0
	// 0 + 127 = 127
	// 127 << 8 = 32512
	// 32512 + 0 = 32512
	// 32512 << 8 = 8323072
	// 8323072 + 0 = 8323072
	// 8323072 << 8 = 2130706432
	// 2130706432 + 1 = 2130706433
	// 1111111000000000000000000000001
	assert.strictEqual(ipToInt('127.0.0.1'), 2130706433, 'Localhost IP address');
};

const testPrivateNetwork = () => {
	assert.strictEqual(ipToInt('10.0.0.1'), 167772161, 'Single class A network');
};

const testNegative = () => {
	assert.strictEqual(ipToInt('192.168.1.10'), -1062731510, 'Negative number');
};

const testFourZeros = () => {
	assert.strictEqual(ipToInt('0.0.0.0'), 0, 'Four zeros');
};

const testWrongString = () => {
	try {
		ipToInt('wrong-string');
	} catch (error) {
		assert.strictEqual(error.message, 'Wrong IPv4 format', 'Wrong string');
	}
};

const testEmptyString = () => {
	try {
		ipToInt('');
	} catch (error) {
		assert.strictEqual(error.message, 'Empty is not allowed', 'Empty string');
	}
};

const testThrowEmptyString = () => {
	assert.throws(() => ipToInt(''),
		err => {
			if (err instanceof Error && err.message === 'Empty is not allowed') {
				return true;
			}
		}
		, 'Empty string');
};

const testFourEights = () => {
	const n = ipToInt('8.8.8.8');
	assert.strictEqual(n, 0x08080808, 'Four eights');
};

const tests = [
	testLocalhost,
	testPrivateNetwork,
	testNegative,
	testFourZeros,
	testWrongString,
	testWrongString,
	testEmptyString,
	testThrowEmptyString,
	testFourEights
];

tests.forEach(test => {
	try {
		test();
	} catch (error) {
		console.log(error);
	}
});