'use strict';

const { Cluster } = require('puppeteer-cluster');

const _screenshotCluster = async () => {
	const cluster = await Cluster.launch({
		concurrency: Cluster.CONCURRENCY_CONTEXT,
		maxConcurrency: 2
	});

	await cluster.task(async ({ page, data: url }) => {
		await page.goto(url);
		return await page.screenshot({
			encoding: 'binary'
		});
	});

	return cluster;
};

module.exports = async (app) => {
	app.set('screenshot', await _screenshotCluster(app));
};
