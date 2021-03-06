(function () {
    'use strict';

	angular
		.module('app.core')
		.factory('GoogleAuthenticationProvider', GoogleAuthenticationProvider);

	function GoogleAuthenticationProvider (Events) {
		var emitter = Events.getEmitter(),
			scriptAdded;

		function init() {
			if (!scriptAdded) {
				var po = document.createElement('script');
				  po.type = 'text/javascript';
				  po.async = true;
				  po.src = 'https://apis.google.com/js/client:platform.js?onload=googleApiLoaded';
				  var s = document.getElementsByTagName('script')[0];
				  s.parentNode.insertBefore(po, s);
				  scriptAdded = true;
			}
		}

		window.googleApiLoaded = function () {
			gapi.auth.signIn({
				scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
				clientid: '452210508834-njv84nt2nrla2jlf07mdcaur28jh2sn1.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
				//approvalprompt: 'force',
				//accesstype: 'online',
				callback: signInCallback,
				requestvisibleactions: 'http://schema.org/AddAction'
			});
		}

		function signInCallback(authResult) {
			console.log(authResult);
			if (authResult['code']) {
				emitter.emit('accessTokenReady', authResult['code']);
				gapi.client.load('plus','v1').then(function() {
					gapi.client.plus.people.get({
				    	'userId': 'me'
				    }).then(function (res){
				    	var profile = res.result;
				    	console.log(profile);
				    	if (profile) {
				    		emitter.emit('authenticationInfoReady', JSON.stringify({
					    		type: 'Google',
					            id: profile.id,
					            userName: profile.displayName,
					            email: profile.emails[0].value
					    	}));
				    	}
				    });
				});
			} else {
				console.log("authentication failed", authResult);
			}   
		}

		function getAuthenticationInfo() {
			init();
		}

		function getAccessToken() {
			init();
		}

		return angular.extend({
			getAuthenticationInfo: getAuthenticationInfo,
			getAccessToken: getAccessToken
		}, emitter.getListener());
	}	    

})();