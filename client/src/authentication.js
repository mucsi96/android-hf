define('Authentication', function (require) {
	var storage = require('Storage'),
		page = require('Page');

	if (!storage.get('authenticationInfo')) {
		if (window.AuthenticationProvider) {
			console.log('AuthenticationProvider found.');
		} else {
			console.log('AuthenticationProvider not found. Using client side authentication provide.');
			AuthenticationProvider = require('GoogleAuthenticationProvider');
		}

		console.log('Requesting authenticationInfo...');
		AuthenticationProvider.getAuthenticationInfo();		
	} else {
		page.userName.text(storage.get('authenticationInfo').userName);
	}


	window.onAuthenticationInfoReady = function (json) {
		var authenticationInfo;
		console.log('AuthenticationInfo ready: ' + json);
		authenticationInfo = JSON.parse(json);
		storage.put('authenticationInfo', authenticationInfo);
		console.log('User name is: ' + authenticationInfo.userName);
		console.log('Requesting access token');
		page.userName.text(authenticationInfo.userName);
		AuthenticationProvider.getAccessToken(json);
	}

	window.onAccessTokenReady = function (token) {
		console.log('Access token ready: ' + token);
		storage.put('accessToken', token);
	}
});