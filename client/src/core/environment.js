(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('Environment', Environment);

	function Environment (Events) {
		var emitter = Events.getEmitter(),
			online = true;

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
		} else {
			emitter.emit('online');
		}

		window.goOnline = function() {
			online = true;
			emitter.emit('online');
		}

		window.goOffline = function() {
			online = false;
			emitter.emit('offline');
		}

		function isOnline() {
			return online;
		}

		return angular.extend({
			isOnline: isOnline,
		}, emitter.getListener());
	}

})();