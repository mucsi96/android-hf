(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('Storage', Storage);

	function supports_html5_storage() {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
	};

	function Storage () {
		if (supports_html5_storage()) {
			return {
				get: function (key) {
					var stringValue = localStorage.getItem(key);
					return JSON.parse(stringValue);
				},
				put: function (key, value) {
					var stringValue = JSON.stringify(value);
					localStorage.setItem(key, stringValue);
				}
			};
		} else {
			return {
				get: function () {},
				put: function () {}
			};
		}
	}

})();