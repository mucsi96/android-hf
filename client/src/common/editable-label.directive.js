(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('editableLabel', editableLabel); 

    function editableLabel ($compile) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                onUpdate: '&',
                onRemove: '&',
                ngModel: '=',
                editable: '@'
            },
            templateUrl: 'templates/editable-label.html',
            controller: function ($scope) {
                var vm = this;

                vm.label = $scope.ngModel[$scope.editable];

                vm.showEditor = function () {
                    vm.editor = $scope.ngModel[$scope.editable];
                    vm.edit = true;
                };

                vm.acceptEdit = function () {
                    $scope.ngModel[$scope.editable] = vm.editor;
                    vm.label = $scope.ngModel[$scope.editable];
                    vm.edit = false;
                    $scope.onUpdate();
                };

                vm.cancelEdit = function () {
                    vm.editor = null;
                    vm.edit = false;
                };

                vm.remove = function () {
                    $scope.onRemove();
                }
            },
            controllerAs: 'vm'
        };
    }   

})();