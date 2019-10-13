'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const moment = require('moment');
const Jimp = require('Jimp');
const getColor = require('get-image-colors');
const Joi = require('@hapi/joi');
const crypto = require('lib/crypto');

module.exports.validator = async (req, res, callback) => {
	const schema = Joi.object({
		base64_data_url: Joi.string().pattern(/data:image\/(jpeg|jpg|png);base64,([^\"]*)/).required()
	});

	const { error, value } = schema.validate({
		base64_data_url: req.body.base64_data_url
	});

	if (error) {
		// TODO
		throw new Error();
	}

	callback();
};

module.exports.handler = async (req, res) => {
	try {
		const base64 = req.body.base64_data_url.substr(5).split(';base64,');
		const data = base64[1];
		const mimetype = base64[0].split('data:')[0];
		const extname = mimetype.split('/')[1];
		let dest = `${path.join(__dirname, '../log')}/trace/${moment().format('YYYY/MM/DD')}`;

		const mkdir = util.promisify(fs.mkdir);
		await mkdir(dest, { recursive: true });

		const writeFile = util.promisify(fs.writeFile);
		dest = `${dest}/${crypto.traceId(req)}.${extname}`;
		await writeFile(dest, data, 'base64');

		const image = await Jimp.read(dest);
		const colors = await getColor(dest);

		res.json({
			colors: [...new Set(colors.map(color => color.hex()))],
			width: image.bitmap.width,
			height: image.bitmap.height,
			mimetype: mimetype,
			base64_data_url: req.body.base64_data_url
		});
	} catch (error) {
		throw error;
	}
};
