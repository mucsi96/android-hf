var mongo = require('mongodb'),
	monk = require('monk'),
	db = monk('localhost:27017/memorize');

	function middleware(req,res,next) {
		req.db = db;
    	next();
	}

module.exports = middleware;