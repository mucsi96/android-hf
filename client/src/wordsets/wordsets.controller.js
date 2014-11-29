(function () {
    'use strict';

	angular
		.module('app.wordsets')
		.controller('WordsetsController', WordsetsController);

	function WordsetsController(Storage, $translate, uuid2) {
		var vm = this;

		if (!Storage.get('wordsets')) {
			Storage.put('wordsets', [{
				id: 1,
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
				id: 2,
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
				id: 3,
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
			}]);
		}

		vm.wordsets = Storage.get('wordsets');

		

		function create() {
			vm.wordsets.push({
				id: uuid2.newuuid(),
				name: $translate.instant('NEW_WORDSET'),
				words: []
			});
			Storage.put('wordsets', vm.wordsets);
		}

		vm.create = create;
	}

})();