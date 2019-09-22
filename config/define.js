'use strict';

const fs = require('fs');
const path = require('path');
const statuses = require('statuses');

global.SERVER_CONFIG = JSON.parse(fs.readFileSync(`${path.join(__dirname, '.')}/config.json`, 'utf8'));

global.Error = class extends Error {
	constructor(status = 500, message) {
		super();

		this.status = typeof status === 'number' ? status : 500;
		this.message = message || statuses[status] || 'Internal Server Error';
	}
};
