(function () {
    'use strict';

	angular
		.module('app.core')
		.config(initRoute);

	function initRoute($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}   

})();