'use strict';

const debug = require('debug');
const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports.logger = (alias) => {
	const logPack = {
		error: debug(`[${process.pid}][ERROR][${alias}]`),
        info: debug(`[${process.pid}][INFO][${alias}]`)
	};

	logPack.info.log = console.log.bind(console);

	return logPack;
};

module.exports.save = async (logger, dir, filename, data) => {
	try {
		const mkdir = util.promisify(fs.mkdir);
		const writeFile = util.promisify(fs.writeFile);
		await mkdir(dir, { recursive: true });
		await writeFile(`${dir}${path.sep}${filename}`, data);
	} catch (e) {
		logger.error(`log save error: ${e}`);
		return false;
	}

	logger.info(`log save success`);
	return true;
};
