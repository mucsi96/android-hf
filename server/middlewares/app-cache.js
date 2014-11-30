var fs = require('fs'),
	path = require('path'),
	appCacheFile = path.join(__dirname, '..', '..', 'client', 'app.cache');

function serveAppCache(req, res, next) {
	if(req.url === '/app.cache') {
		res.writeHead(200, {'Content-Type': 'text/cache-manifest'});
		res.end(fs.readFileSync(appCacheFile));
	} else {
		next();
	}
}

module.exports = serveAppCache;