(function () {
    'use strict';

	angular
		.module('app.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController() {
		var vm = this;

		vm.wordsets = [{
			name: 'Wordset1',
			words: [
				{
					hu: 'Alma',
					en: 'Apple'
				},
				{
					hu: 'Narancs',
					en: 'Orange'
				},
				{
					hu: 'Szilva',
					en: 'Plum'
				},
				{
					hu: 'Répa',
					en: 'Carrot'
				}
			]
		},{
			name: 'Wordset2',
			words: [
				{
					hu: 'Alma',
					en: 'Apple'
				},
				{
					hu: 'Narancs',
					en: 'Orange'
				}
			]
		},{
			name: 'Wordset3',
			words: [
				{
					hu: 'Alma',
					en: 'Apple'
				},
				{
					hu: 'Narancs',
					en: 'Orange'
				},
				{
					hu: 'Szilva',
					en: 'Plum'
				}
			]
		}];
	}

})();