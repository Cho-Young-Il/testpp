'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);

const getFirstPathList = (next) => {
	request({
		url: 'https://www.iconfinder.com/free_icons',
		timeout: 300000,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
		}
	}, (error, response, body) => {
		if (error) {
			console.log(error);
		}

		let $ = cheerio.load(body);
		const atags = $('div.card > a');

		for (const atag of Object.values(atags)) {
			console.log($(atag).attr('href'));
		}
	});
};

const baseIconFinderUrl = 'https://www.iconfinder.com';

const sleep = (ms) => {
	return new Promise(resolve=>{
		setTimeout(resolve,ms)
	})
};

const iconJSON = {};

(async () => {
	let count = 1;
	const json = JSON.parse(fs.readFileSync('./tempJSON.json', 'utf8'));
	for (const category of Object.keys(json)) {
		for (const url of Object.values(json[category])) {
			try {
				const filename = url.replace(/https:\/\/www.iconfinder.com\/icons\/|\/download\/svg\/128/gi, '');

				let body = await request({
					method: 'get',
					url: url,
					timeout: 300000,
					headers: {
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
					}
				});
				fs.writeFileSync(`./icons/${category}/svg/${filename}.svg`, body, 'utf8');
				await sleep(400);

				body = await request({
					method: 'get',
					url: url.replace('svg', 'png'),
					timeout: 300000,
					headers: {
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
					},
					encoding: 'binary'
				});
				fs.writeFileSync(`./icons/${category}/png/${filename}.png`, body, 'binary');
				await sleep(400);

				iconJSON[category] = iconJSON[category] || [];
				iconJSON[category].push(filename);
				console.log(category, filename, count);
				count++;
			} catch (e) {
				console.log(category, url, e);
			}
		}
		fs.writeFileSync('./icons.json', JSON.stringify(iconJSON), 'utf8');
	}

	fs.writeFileSync('./icons.json', JSON.stringify(iconJSON), 'utf8');
	console.log(count);
})();
