define('Storage', function (require, module) {
	if (supports_html5_storage()) {
		module.exports = {
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
		module.exports = {
			get: function () {},
			put: function () {}
		};
	}

	function supports_html5_storage() {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
	};

});