'use strict';

const crypto = require('lib/crypto');
const moment = require('moment');

module.exports = (error, req, res, callback) => {
	const logger = req.logger;

	req.logger.error(error);

	if (error.status) {
		res.status(error.status);
	} else {
		return process.emit('uncaughtException', error);
	}

	const traceId = crypto.traceId(req);

	const resData = {
		error: {
			code: error.status,
			message: error.message,
			trace_id: traceId
		}
	};

	let remoteAddr = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');
	const isDeveloper = (SERVER_CONFIG.developers || []).filter(el => (el.ip === remoteAddr)).length > 0;

	if (isDeveloper) {
		resData.error.stack = error.stack;
	}

	res.error = resData.error;

	if (req.url.indexOf('/api/') !== -1) {
		res.json(resData);
	} else {
		res.render('error', resData);
	}

	callback();
};
