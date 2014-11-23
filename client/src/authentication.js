define('Authentication', function (require) {
	if (window.AuthenticationProvider) {
		console.log('AuthenticationProvider found.');
	} else {
		console.log('AuthenticationProvider not found. Using client side authentication provide.');
		AuthenticationProvider = require('GoogleAuthenticationProvider');
	}

	console.log('Requesting authenticationInfo...');
	AuthenticationProvider.getAuthenticationInfo();

	window.onAuthenticationInfoReady = function (json) {
		console.log('AuthenticationInfo ready: ' + json);
		window.authenticationInfo = JSON.parse(json);
		console.log('User name is: ' + authenticationInfo.userName);
		console.log('Requesting access token');
		$('#user-name').text(authenticationInfo.userName);
		AuthenticationProvider.getAccessToken(json);
	}

	window.onAccessTokenReady = function (token) {
		console.log('Access token ready: ' + token);
		window.accessToken = token;
	}
});