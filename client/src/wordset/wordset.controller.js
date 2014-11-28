(function() {
    'use strict';

    angular
        .module('app.wordset')
        .controller('WordsetController', WordsetController);

    function WordsetController(Storage, $stateParams) {
    	var vm = this;

    	getWords();

    	function getWords() {
    		var id = $stateParams.wordsetId,
    			wordsets = Storage.get('wordsets');

    		vm.words = wordsets.filter(function (wordset) {
    			return wordset.id == id;
    		})[0].words;
    	}
    }

})();
