(function () {
    'use strict';

	angular
        .module('app.common')
        .directive('onEnterPress', onEnterPress); 

    function onEnterPress () {
	    return {
	        restrict: 'A',
	        link: function (scope, elem, attrs) {
	            elem.bind('keyup', function () {
	                if (event.keyCode === 13) {
	                    scope.$apply(function () {
	                        scope.$eval(attrs.onEnterPress);
	                    });
	                }
	            });
	        }
	    };
	}

})();