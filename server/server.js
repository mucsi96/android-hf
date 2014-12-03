var express = require('express'),
	app = express(),
	https = require("https"),
	http = require("http"),
	httpsMiddleware = require('./middlewares/https'),
	staticMiddleware = require('./middlewares/static'),
	appCacheMiddleware = require('./middlewares/app-cache'),
	authenticationMiddleware = require('./middlewares/authentication'),
	storageMiddleware = require('./middlewares/storage'),
	dbMiddleware = require('./middlewares/db');

app.use(httpsMiddleware);
app.use(staticMiddleware);
app.use(appCacheMiddleware);
app.use(authenticationMiddleware);
app.use(dbMiddleware);
app.use(storageMiddleware);

console.log('Server is running on ports 80 and 443');

http.createServer(app).listen(80);
https.createServer(httpsMiddleware.options, app).listen(443);




