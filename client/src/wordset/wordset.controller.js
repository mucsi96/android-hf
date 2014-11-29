(function() {
    'use strict';

    angular
        .module('app.wordset')
        .controller('WordsetController', WordsetController);

    function WordsetController(Storage, $scope, $state, $stateParams, $modal, $translate, uuid2) {
        var vm = this;

        vm.editing = false;

        getWords();

        function getWords() {
            var id = $stateParams.wordsetId;

            vm.wordsets = Storage.get('wordsets'),
                vm.wordset = vm.wordsets.filter(function(wordset) {
                    return wordset.id == id;
                })[0];

            vm.words = vm.wordset.words;
            vm.title = vm.wordset.name;
        }

        vm.showEditor = function() {
            vm.editor = vm.title;
            vm.editing = true;
        };

        vm.acceptEdit = function() {
            vm.title = vm.editor;
            vm.wordset.name = vm.editor;
            vm.editing = false;
            saveWordset()
        };

        vm.cancelEdit = function() {
            vm.editor = null;
            vm.editing = false;
        };

        function getIndex(array, id) {
            var result;

            array.some(function(item, index) {
                var found = item.id === id;

                if (found) {
                    result = index;
                    return true;
                }
            });

            return result;
        }

        function removeWordset() {
            var index = getIndex(vm.wordsets, vm.wordset.id);

            if (index) {
                vm.wordsets.splice(index, 1);
                Storage.put('wordsets', vm.wordsets);
                $state.go('wordsets');
            }
        }

        function saveWordset() {
            var index = getIndex(vm.wordsets, vm.wordset.id);

            if (index) {
                vm.wordsets[index] = vm.wordset;
                Storage.put('wordsets', vm.wordsets);
            }
        }

        function confirmRemove(message, remove) {
            $modal.open({
                templateUrl: 'templates/remove-confirm.html',
                controller: function($modalInstance) {
                    var vm = this;

                    vm.message = message;

                    vm.delete = function() {
                        $modalInstance.close();
                        remove();
                    };

                    vm.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                },
                controllerAs: 'vm'
            });
        }

        function confirmWordsetRemove() {
            confirmRemove($translate.instant('CONFIRM_DELETE'), removeWordset);
        }

        function confirmWordRemove(word) {
            confirmRemove($translate.instant('CONFIRM_DELETE'), function() {
                removeWord(word);
            });
        }

        function showWordDialog(word, done, remove) {
            $modal.open({
                templateUrl: 'templates/word-edit.html',
                controller: function($modalInstance) {
                    var vm = this;

                    vm.id = word.id;
                    vm.en = word.en;
                    vm.hu = word.hu;

                    vm.remove = function() {
                        $modalInstance.close();
                        remove(vm);
                    }

                    vm.create = function() {
                        $modalInstance.close();
                        done(vm);
                    };

                    vm.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                },
                controllerAs: 'vm'
            });
        }

        function showEditWordDialog(word) {
            showWordDialog(word, saveWord, confirmWordRemove);
        }

        function showCreateWordDialog() {
            showWordDialog({
                en: 'New word',
                hu: 'Új szó'
            }, createWord);
        }

        function createWord(word) {
            vm.wordset.words.push({
                id: uuid2.newuuid(),
                en: word.en,
                hu: word.hu
            });
            saveWordset();
            getWords();
        }

        function saveWord(word) {
            var index = getIndex(vm.wordset.words, word.id);

            if (index) {
                vm.wordset.words[index] = word;
                saveWordset();
                getWords();
            }
        }

        function removeWord(word) {
            var index = getIndex(vm.wordset.words, word.id);

            if (index) {
                vm.wordset.words.splice(index, 1);
                Storage.put('wordsets', vm.wordsets);
                getWords();
            }
        }

        vm.editWord = showEditWordDialog;

        vm.create = showCreateWordDialog;

        vm.remove = confirmWordsetRemove;
    }

})();
