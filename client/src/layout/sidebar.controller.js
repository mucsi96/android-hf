(function () {
    'use strict';

	angular
		.module('app.layout')
		.controller('SidebarController', SidebarController);

	function SidebarController ($rootScope) {
		var vm = this;

		vm.sidebarIn = false;

		$rootScope.$on('toggleSidebar', function () {
			vm.sidebarIn = !vm.sidebarIn;
		})
	} 

})();