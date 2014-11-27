(function () {
    'use strict';

	angular
		.module('app.layout')
		.controller('SidebarController', SidebarController);

	function SidebarController ($rootScope, $state, routerHelper, $translate) {
		var vm = this;
		var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;

		vm.sidebarIn = false;

		vm.toggleSidebar = function () {
			vm.sidebarIn = !vm.sidebarIn;
		}

		$rootScope.$on('toggleSidebar', vm.toggleSidebar);

		activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = states.map(function(r) {
                return $.extend({}, r, {translatedTitle: $translate.instant(r.title)});
            }).filter(function(r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return false;
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName;
        }

        $rootScope.$on('$translateChangeSuccess', getNavRoutes);
	} 

})();