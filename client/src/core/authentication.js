(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('AuthenticationProvider', ExtendedAuthenticationProvider);

	function ExtendedAuthenticationProvider(Events, Storage, GoogleAuthenticationProvider) {
		var emitter = Events.getEmitter(),
			AuthenticationProvider = window.AuthenticationProvider,
			accessToken;

		if (!AuthenticationProvider) {
			AuthenticationProvider = GoogleAuthenticationProvider;
			AuthenticationProvider.on('authenticationInfo', function (authenticationInfo) {
				storage.put('authenticationInfo', authenticationInfo);
				emitter.emit('authenticationInfoReady', authenticationInfo);
			});
			AuthenticationProvider.on('accessTokenReady', function (token) {
				accessToken = token;
				emitter.emit('accessTokenReady', token);
			});
			console.log('AuthenticationProvider not found. Using client side authentication provider.');
		} else {
			console.log('AuthenticationProvider found.');
		}

		function getAuthenticationInfo() {
			var authenticationInfo = Storage.get('authenticationInfo');

			if (authenticationInfo) {
				emitter.emit('authenticationInfoReady', authenticationInfo);
			} else {
				console.log('Requesting authenticationInfo...');
				AuthenticationProvider.getAuthenticationInfo();
			}
		}

		function getAccessToken () {
			if (accessToken) {
				emitter.emit('accessTokenReady', accessToken);
			} else {
				console.log('Requesting accessToken...');
				AuthenticationProvider.getAccessToken();
			}
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
			accessToken = token;
			emitter.emit('accessTokenReady', token);
		}

		return angular.extend({
			getAuthenticationInfo: getAuthenticationInfo,
			getAccessToken: getAccessToken,
		}, emitter.getListener());
	}   

})();