var express = require('express'),
	path = require('path'),
	staticFolder = path.join(__dirname, '..', '..', 'client', 'dist');

module.exports = express.static(staticFolder);