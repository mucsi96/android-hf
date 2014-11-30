(function () {
    'use strict';

	angular
		.module('app.wordsets')
		.controller('WordsetsController', WordsetsController);

	function WordsetsController(Storage, $translate, uuid2) {
		var vm = this;

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