(function () {
    'use strict';

	angular
		.module('app.settings')
		.run(initRoute);

	function initRoute(routerHelper) {
		var states = [
            {
                state: 'settings',
                config: {
                    url: '/settings',
                    templateUrl: 'templates/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    title: 'SETTINGS',
                    iconClasses: 'fa fa-gear',
                    settings: {
                        nav: 4
                    }
                }
            }
        ];
        routerHelper.configureStates(states);
	}   

})();