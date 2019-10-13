'use strict';

const request = require('request');
const fs = require('fs');
// svg
// request({
// 	method: 'get',
// 	url: 'https://www.iconfinder.com/icons/2993682/download/svg/128',
// 	timeout: 300000,
// 	headers: {
// 		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
// 	}
// }, (error, response, body) => {
// 	console.log(body);
// })

// png
// request({
// 	method: 'get',
// 	url: 'https://www.iconfinder.com/icons/2993682/download/png/128',
// 	headers: {
// 		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
// 	},
// 	encoding: 'binary'
// }, (error, response, body) => {
// 	fs.writeFileSync('./test.png', body, 'binary');
// 	console.log(body);
// });
