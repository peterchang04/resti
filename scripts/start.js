'use strict';
var restListener = require('../src/core/restListener');

process.on('uncaughtException',(e) => {
	console.warn('Oops');
	process.exit();
});