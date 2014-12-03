(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('Storage', Storage);

    function supports_html5_storage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    function Storage(Events) {
        var emitter = Events.getEmitter();

        if (supports_html5_storage()) {
            return angular.extend({
                get: function(key) {
                    var stringValue = localStorage.getItem(key);
                    return angular.fromJson(stringValue);
                },
                put: function(key, value) {
                    var stringValue = angular.toJson(value);
                    localStorage.setItem(key, stringValue);
                    emitter.emit('change');
                },
                update: update
            }, emitter.getListener());
        } else {
            console.log("Local storage not supported!");
            return angular.extend({
                get: function() {},
                put: function() {},
                update: function () {}
            }, emitter.getListener());
        }
    }

    function update() {
        window.addEventListener('load', function(e) {
            if (window.applicationCache) {
                window.applicationCache.addEventListener('updateready', function(e) {
                    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                        // Browser downloaded a new app cache.
                        // Swap it in and reload the page to get the new hotness.
                        window.applicationCache.swapCache();
                        if (confirm('A new version of this site is available. Load it?')) {
                            window.location.reload();
                        }
                    } else {
                        // Manifest didn't changed. Nothing new to server.
                    }
                }, false);
            }
        }, false);
    }

    update();

})();
