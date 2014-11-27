(function () {
    'use strict';

	angular
		.module('app.dashboard')
		.run(initRoute);  

	function initRoute(routerHelper) {
		var states = [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'HOME',
                    iconClasses: 'fa fa-home',
                    settings: {
                        nav: 1
                    }
                }
            }
        ];
        routerHelper.configureStates(states);
	}    

})();