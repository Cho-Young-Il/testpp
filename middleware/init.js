'use strict';

const crypto = require('lib/crypto');
const log = require('lib/log');
const statuses = require('statuses');
const moment = require('moment');
const path = require('path');

module.exports = (req, res, callback) => {
	const traceId = crypto.traceId(req);
	req.logger = log.logger(traceId)

	res.on('finish', async () => {
		const logdir = `${path.join(__dirname, '../log')}/${moment().format('YYYY/MM/DD')}`;
		console.log(logdir);
		const logfile = `${traceId}.log`;
		const logpath = `${logdir}/${logfile}}`.replace(/\//g, path.sep);
		const logdata = {
	        servername: process.env.HOSTNAME || '',
	        log_path: logpath,
	        request: {
	            method: req.method, url: req.url, cookie: req.cookies,
	            header: req.headers, param: req.params, query: req.query,
	            body: req.body, http_version: req.httpVersion,
	            remote_addr: req.headers['x-forwarded-for'] || req.connection.remoteAddress
	        },
	        response: {
	            header: res.getHeaders()
	        }
		};

		if (res.error) {
			logdata.error = res.error
		} else {
			logdata.meta = {
				code: res.statusCode,
				message: statuses[res.statusCode],
				trace_id: traceId
			};
		}

		log.save(req.logger, logdir, logfile, JSON.stringify(logdata));
	});

	// TODO alarm
	callback();
};
