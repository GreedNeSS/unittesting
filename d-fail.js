'use strict';

const assert = require('assert');

const fn = (willFail, callback) => {
	setTimeout(() => {
		if (willFail) callback(new Error('No data available'));
		else callback(null, 'Data available');
	}, 0);
};

fn(false, err => {
	assert.ifError(err);
	// assert.fail(err);
});

fn(true, err => {
	assert.ifError(err);
	// assert.fail(err);
});