(function () {
    'use strict';

	angular
		.module('app.layout')
		.controller('ShellController', ShellController);

	function ShellController (Events, config, Environment, AuthenticationProvider, $scope, $rootScope) {
		var emitter = Events.getEmitter(),
			vm = this;

		vm.title = config.appTitle;
		vm.offline = false;

		function apply () {
			if(!$scope.$$phase) {
				$scope.$apply();
			}
		}

		Environment.on('online', function () {
			vm.offline = false;
			apply();
		});

		Environment.on('offline', function () {
			vm.offline = true;
			apply();
		});

		AuthenticationProvider.on('authenticationInfoReady', function (authenticationInfo) {
			vm.userName = authenticationInfo.userName;
			apply();
		});
		AuthenticationProvider.getAuthenticationInfo();

		vm.toggleSidebar = function () {
			$rootScope.$emit('toggleSidebar');
		}
	}

})();