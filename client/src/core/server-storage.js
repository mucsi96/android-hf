(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('ServerStorage', ServerStorage);

    function ServerStorage(Environment, AuthenticationProvider, $http, Storage) {
        var preCheck = false,
            serverConnected = false,
            authInfo,
            accessToken;

        Environment.on('online', function() {
            if (serverConnected) {
                synchronize();
            } else {
                connectToServer();
            }
        });
        AuthenticationProvider.on('authenticationInfoReady', function(data) {
            authInfo = data;
            if (Environment.isOnline()) {
                if (serverConnected) {
                    synchronize();
                } else {
                    connectToServer();
                }
            }
        });
        AuthenticationProvider.on('accessTokenReady', function(data) {
            accessToken = data;
            if (Environment.isOnline()) {
                if (serverConnected) {
                    synchronize();
                } else {
                    connectToServer();
                }
            }
        });

        function connectToServer() {
            if (preCheck) {
                if (accessToken) {
                    sendAuthenticationInfo();
                } else {
                    if (authInfo) {
                        AuthenticationProvider.getAccessToken();
                    } else {
                        AuthenticationProvider.getAuthenticationInfo();
                    }
                }
            } else {
                console.log('Checking server connection');
                $http.get('/auth/status')
                    .success(function(data) {
                        console.log(angular.toJson(data));
                        if (data) {
                            serverConnected = data.connected;
                        }
                        if (serverConnected) {
                            console.log('Server connection established');
                            synchronize();
                        } else {
                            if (accessToken) {
                                sendAuthenticationInfo();
                            } else {
                                if (authInfo) {
                                    AuthenticationProvider.getAccessToken();
                                } else {
                                    AuthenticationProvider.getAuthenticationInfo();
                                }
                            }
                        }
                    });
                preCheck = true;
            }

        }

        function sendAuthenticationInfo() {
            $http.post('/auth/google/callback', {
                    code: accessToken
                })
                .success(function(data) {
                    console.log(angular.toJson(data));
                    if (data) {
                        serverConnected = data.connected;
                    }
                    if (serverConnected) {
                        synchronize();
                    }
                })
                .error(function(data) {
                    console.log(angular.toJson(data));
                });
        }

        function synchronize() {
            console.log('Synchronizing...')
            $http.post('/storage', Storage.get('wordsets'));
        }
    }

})();
