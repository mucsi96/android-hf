(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('Environment', Environment);

	function Environment (Events) {
		var emitter = Events.getEmitter();

		if (window.Android) {
			Android.log('Hello for webApp v11');
			window.onerror = function(errorMessage, url, lineNumber) {
				Android.error(angular.toJson({
					errorMessage: errorMessage,
					url: url,
					lineNumber: lineNumber
				}));	
			}
			console.log('Consoles redirected.');
			console.log('Getting network status.');
			Android.getNetworkStatus();
		} 

		window.goOnline = function() {
			emitter.emit('online');
		}

		window.goOffline = function() {
			emitter.emit('offline');
		}

		return emitter.getListener();
	}

})();