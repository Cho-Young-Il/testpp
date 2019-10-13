'use strict';

module.exports = (app) => {
	app.get('/front/editor', require('route/front.editor'));
	app.post('/api/image/get-info', require('route/api.image.info').validator, require('route/api.image.info').handler);
	app.get('/api/screenshot', require('route/api.screenshot').validator, require('route/api.screenshot').handler);
};
