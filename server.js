'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const logger = require('lib/log').logger('server.js');

require('express-async-errors');
require('config/define');

const app = express();

app.get('/favicon.ico', (req, res) => { res.sendStatus(204); });
app.set('views', path.join(process.env.NODE_PATH, 'view'));
app.set('view engine', 'ejs');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/resource', express.static(path.join(process.env.NODE_PATH, 'resource')));
app.use('/imagetracerjs', express.static(path.join(process.env.NODE_PATH, 'imagetracerjs')));

app.use(require('middleware/init'));

require('config/context')(app);
require('config/route')(app);

app.use((req, res, callback) => { callback(); });
app.use(require('lib/finalhandler'));

const server = http.createServer(app);
server.listen(3000);
server.on('error', (error) => { throw error; });
server.on('listening', () => { logger.info('server listening') });

const _shutdown = () => {
	server.close();
	logger.error('http server closed');

	// TODO alarm

	setTimeout(() => {
		logger.error('process shutdown');
		process.exit(1);
	}, 500);
};

process.on('uncaughtException', (error) => {
	logger.error(`process uncaughtException: ${error.stack}`);
	_shutdown();
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason.stack}`);
  _shutdown();
});
