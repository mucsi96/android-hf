(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('Environment', Environment);

	function Environment (Events) {
		var emitter = Events.getEmitter();

		if (window.Android) {
			Android.log('Hello for webApp v3');
			console.log = function(message) {
				Android.log(message);
			};
			console.error = function(error) {
				Android.error(error);
			};
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