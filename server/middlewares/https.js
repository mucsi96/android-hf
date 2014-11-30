/*
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 3650
*/
var path = require('path'),
	fs = require('fs'),
	keyFile = path.join(__dirname, '..', '..', 'certs', 'key.pem'),
	certFile = path.join(__dirname, '..', '..', 'certs', 'cert.pem'),
	options = {
		key: fs.readFileSync(keyFile),
		cert: fs.readFileSync(certFile)
	};

function requireHTTPS(req, res, next) {
	if (!req.secure && req.url !== '/memorize.crt') {
		return res.redirect('https://' + req.get('host') + req.url);
	}
	next();
};

requireHTTPS.options = options;

module.exports = requireHTTPS;