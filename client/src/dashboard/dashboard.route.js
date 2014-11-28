(function () {
    'use strict';

	angular
		.module('app.dashboard')
		.config(initRoute);  

	function initRoute($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                title: 'HOME',
                iconClasses: 'fa fa-home',
                settings: {
                    nav: 1
                }
            });
	}    

})();