(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('AuthenticationProvider', AuthenticationProvider);

	function AuthenticationProvider(Events, Storage, GoogleAuthenticationProvider) {
		var emitter = Events.getEmitter(),
			AuthenticationProvider = window.AuthenticationProvider;

		if (!AuthenticationProvider) {
			AuthenticationProvider = GoogleAuthenticationProvider;
			console.log('AuthenticationProvider not found. Using client side authentication provider.');
		} else {
			console.log('AuthenticationProvider found.');
		}

		function getAuthenticationInfo() {
			var authenticationInfo = Storage.get('authenticationInfo');

			if (authenticationInfo) {
				emitter.emit('authenticationInfoReady', authenticationInfo);
			} else {
				AuthenticationProvider.on('authenticationInfo', function (authenticationInfo) {
					emitter.emit('authenticationInfoReady', authenticationInfo);
				});
				console.log('Requesting authenticationInfo...');
				AuthenticationProvider.getAuthenticationInfo();
			}
		}

		function getAccessToken () {
			AuthenticationProvider.on('accessTokenReady', function (token) {
				emitter.emit('accessTokenReady', token);
			});
			AuthenticationProvider.getAccessToken();
		}

		window.onAuthenticationInfoReady = function (json) {
			var authenticationInfo;
			console.log('AuthenticationInfo ready: ' + json);
			authenticationInfo = JSON.parse(json);
			storage.put('authenticationInfo', authenticationInfo);
			console.log('User name is: ' + authenticationInfo.userName);
			emitter.emit('authenticationInfoReady', authenticationInfo);
		}

		window.onAccessTokenReady = function (token) {
			console.log('Access token ready: ' + token);
			storage.put('accessToken', token);
			emitter.emit('accessTokenReady', token);
		}

		return angular.extend({
			getAuthenticationInfo: getAuthenticationInfo,
			getAccessToken: getAccessToken
		}, emitter.getListener());
	}   

})();