var express = require('express');
var https = require("https");
var http = require("http");
var path = require("path");
var fs = require("fs");
var staticFolder = path.join(__dirname, '..', 'client', 'dist');
var appCacheFile = path.join(__dirname, '..', 'client', 'app.cache');
/*
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 3650
*/
var keyFile = path.join(__dirname, '..', 'certs', 'key.pem');
var certFile = path.join(__dirname, '..', 'certs', 'cert.pem');
var options = {
	key: fs.readFileSync(keyFile),
	cert: fs.readFileSync(certFile)
};
var app = express();

app.use(requireHTTPS);
app.use(serveAppCache);
app.use(express.static(staticFolder));

console.log('Server is running on ports 80 and 443');

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);


function requireHTTPS(req, res, next) {
	if (!req.secure && req.url !== '/memorize.crt') {
		return res.redirect('https://' + req.get('host') + req.url);
	}
	next();
}

function serveAppCache(req, res, next) {
	if(req.url === '/app.cache') {
		res.writeHead(200, {'Content-Type': 'text/cache-manifest'});
		res.end(fs.readFileSync(appCacheFile));
	}
	next();
}