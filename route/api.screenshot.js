'use strict';

const Joi = require('@hapi/joi');

module.exports.validator = async (req, res, callback) => {
	const schema = Joi.object({
		mall_id: Joi.string()
	});

	const { error, value } = schema.validate({
		mall_id: req.query.mall_id
	});

	if (error) {
		throw error;
	}

	callback();
};

module.exports.handler = async (req, res) => {
	try {
		const screenshot = req.app.get('screenshot');
        const screen = await screenshot.execute(req.query.mall_id);

        res.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Content-Length': screen.length
        });

        res.end(screen);
    } catch (error) {
        throw new Error(500, error.message);
    }
};
