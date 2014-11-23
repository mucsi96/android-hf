define('NetworkIndicator', function (require) {
	var page = require('Page');

	window.goOnline = function() {
		page.networkIndicator.toggleClass('offline', false);
	}

	window.goOffline = function() {
		page.networkIndicator.toggleClass('offline', true);
	}
});