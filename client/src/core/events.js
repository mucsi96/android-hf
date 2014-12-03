(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('Events', Events);

	function Events () {
		return {
			getEmitter: function() {
				var handlers = [];

				function emit(event, data) {
					console.log('Emitting ' + event, data, handlers);
					handlers.forEach(function(subscription) {
						if (subscription.event === event) {
							subscription.handler(data);
						}
					})
				}

				function getListener() {

					function on(event, handler) {
						handlers.push({
							event: event,
							handler: handler
						});
					}

					return {
						on: on
					}
				}

				return {
					emit: emit,
					getListener: getListener
				}
			}
		}
	}  

})();