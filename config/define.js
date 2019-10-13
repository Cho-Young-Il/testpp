'use strict';

const fs = require('fs');
const path = require('path');
const statuses = require('statuses');

global.SERVER_CONFIG = JSON.parse(fs.readFileSync(`${path.join(__dirname, '.')}/config.json`, 'utf8'));

global.ExpressError = class extends Error {
	constructor(message, status = 500) {
		super();

		this.status = typeof status === 'number' ? status : 500;
		this.message = message || statuses[status] || 'Internal Server Error';
	}
};
