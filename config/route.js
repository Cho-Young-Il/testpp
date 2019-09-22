'use strict';

module.exports = (app) => {
	app.get('/api/screenshot', require('route/api.screenshot').validator, require('route/api.screenshot').handler);
};
