(function () {
    'use strict';

	angular
        .module('app.common')
        .directive('stopPropagation', stopPropagation); 

    function stopPropagation() {
	    return {
	        restrict: 'A',
	        link: function($scope, $element, $attrs) {
	            var previousEventName = null,
	                eventHandler = function(e) {
	                return e.stopPropagation();
	            };
	            return $attrs.$observe('stopPropagation', function(eventName) {
	                if (previousEventName) {
	                    $element.off(previousEventName, eventHandler);
	                }
	                return $element.on(eventName, eventHandler);
	            });
	        }
	    };
	}    

})();