'use strict';

const fs = require('fs');
const Joi = require('@hapi/joi');

module.exports.validator = async (req, res, callback) => {
	// const schema = Joi.object({
	// 	mall_id: Joi.string()
	// });

	// const { error, value } = schema.validate({
	// 	mall_id: req.query.mall_id
	// });

	// if (error) {
	// 	throw error;
	// }

	callback();
};

module.exports.handler = async (req, res) => {
	try {
		const screenshot = req.app.get('screenshot');
        const screen = await screenshot.execute(req.query.url);

        // res.writeHead(200, {
        //     'Content-Type': 'image/jpg',
        //     'Content-Length': screen.length
        // });

        res.send({screen: screen});

        // const buffer = new Buffer(screen.data, 'binary');
        // console.log(buffer);
        // fs.writeFile('./test.png', buffer, 'binary', function (err) {
        // 	if (err) console.log(err);
        // })
    } catch (error) {
        throw new Error(500, error.message);
    }
};
