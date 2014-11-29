(function () {
    'use strict';

	angular
		.module('app.wordsets')
		.config(initRoute);  

	function initRoute($stateProvider) {
        $stateProvider
            .state('wordsets', {
                url: '/',
                templateUrl: 'templates/wordsets.html',
                controller: 'WordsetsController',
                controllerAs: 'vm',
                title: 'WORDSETS',
                iconClasses: 'fa fa-book',
                settings: {
                    nav: 2
                }
            });
	}    

})();