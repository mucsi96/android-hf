(function() {
    'use strict';

    angular
        .module('app.wordset')
        .config(initRoute);

    function initRoute($stateProvider) {
        $stateProvider
            .state('wordset', {
                url: '/wordset/:wordsetId',
                templateUrl: 'templates/wordset.html',
                controller: 'WordsetController',
                controllerAs: 'vm',
            });
    }

})();
