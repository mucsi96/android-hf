var express = require('express'),
	app = express(),
	https = require("https"),
	http = require("http"),
	httpsMiddleware = require('./middlewares/https'),
	staticMiddleware = require('./middlewares/static'),
	appCacheMiddleware = require('./middlewares/app-cache'),
	authenticationMiddleware = require('./middlewares/authentication'),
	storageMiddleware = require('./middlewares/storage');

app.use(httpsMiddleware);
app.use(authenticationMiddleware);
app.use(appCacheMiddleware);
app.use(storageMiddleware);
app.use(staticMiddleware);

console.log('Server is running on ports 80 and 443');

http.createServer(app).listen(80);
https.createServer(httpsMiddleware.options, app).listen(443);




