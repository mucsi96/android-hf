(function () {
    'use strict';

	angular
		.module('app.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController(Storage, $modal, $translate, uuid2) {
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

		function getIndex(array, id) {
			var result;

			array.some(function (item, index) {
				var found = item.id === id;

				if (found) {
					result = index;
					return true;
				}  
			});

			return result;
		}

		function remove(wordset) {
			var index = getIndex(vm.wordsets, wordset.id);

			if (index) {
				vm.wordsets.splice(index, 1);
				Storage.put('wordsets', vm.wordsets);
			}
		}

		function update(wordset) {
			var index = getIndex(vm.wordsets, wordset.id);

			if (index) {
				vm.wordsets[index] = wordset;
				Storage.put('wordsets', vm.wordsets);
			}
		}

		function confirmRemove(wordset) {
			var modalInstance = $modal.open({
	            templateUrl: 'templates/remove-confirm.html',
	            controller: function ($modalInstance) {
	            	var vm = this;

	            	vm.delete = function () {
				        $modalInstance.close();
				        remove(wordset);
				    };

				    vm.cancel = function () {
				        $modalInstance.dismiss('cancel');
				    };
	            },
	            controllerAs: 'vm'
	        });
		}

		function create() {
			vm.wordsets.push({
				id: uuid2.newuuid(),
				name: $translate.instant('NEW_WORDSET'),
				words: []
			});
			Storage.put('wordsets', vm.wordsets);
		}

		vm.update = update;
		vm.remove = confirmRemove;
		vm.create = create;
	}

})();