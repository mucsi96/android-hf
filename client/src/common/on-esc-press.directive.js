(function () {
    'use strict';

	angular
        .module('app.common')
        .directive('onEscPress', onEscPress); 

    function onEscPress () {
	    return {
	        restrict: 'A',
	        link: function (scope, elem, attrs) {
	            elem.bind('keyup', function () {
	                if (event.keyCode === 27) {
	                    scope.$apply(function () {
	                        scope.$eval(attrs.onEscPress);
	                    });
	                }
	            });
	        }
	    };
	}

})();