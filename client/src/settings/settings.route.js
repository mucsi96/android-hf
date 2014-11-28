(function () {
    'use strict';

	angular
		.module('app.settings')
		.config(initRoute);

	function initRoute($stateProvider) {
        $stateProvider
            .state('settings,', {
                url: '/settings',
                templateUrl: 'templates/settings.html',
                controller: 'SettingsController',
                controllerAs: 'vm',
                title: 'SETTINGS',
                iconClasses: 'fa fa-gear',
                settings: {
                    nav: 4
                }
            });
	}   

})();