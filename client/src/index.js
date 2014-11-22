$( document ).ready(function() {
  var sidebarIn = false,
	$sidebar = $('#sidebar'),
	$navbarToggle = $('#navbar-toggle'),
	$overlay = $('#overlay'),
	$main = $('#main');

	function toggleSideBar(event) {
		sidebarIn = !sidebarIn;
		$sidebar.toggleClass('in', sidebarIn);
		event.stopImmediatePropagation();
	}

	$overlay.on('click', toggleSideBar);

	$navbarToggle.on('click', toggleSideBar);
});

window.goOnline = function() {
	$('#network-indicator').toggleClass('offline', false);
}

window.goOffline = function() {
	$('#network-indicator').toggleClass('offline', true);
}

if(window.Android) {
	console.log = function(text) {
		var prev = $('#status').html();
		$('#status').html(prev + '<br>' + text);
	}
}

if (window.Android) {
	console.log("Requesting authentication info...");
	var authInfo = Android.getAuthenticationInfo();
	if (authInfo) {
		console.log(authInfo);
		try{
			authInfo = JSON.parse(authInfo);
			console.log("Hello " + authInfo.userName);
		} catch(e) {
			console.log(e);
		}
	}
}



/*window.gapi.signin.render('google-button', {
	scope: 'https://www.googleapis.com/auth/plus.login',
	clientid: '452210508834-njv84nt2nrla2jlf07mdcaur28jh2sn1.apps.googleusercontent.com',
	cookiepolicy: 'single_host_origin',
	callback: signinCallback,
	requestvisibleactions: 'http://schema.org/AddAction'
});

function signinCallback(authResult) {
	if (authResult['status']['signed_in']) {
	    // Update the app to reflect a signed in user
	    // Hide the sign-in button now that the user is authorized, for example:
	    console.log('User signed in');
	  } else {
	    // Update the app to reflect a signed out user
	    // Possible error values:
	    //   "user_signed_out" - User is signed-out
	    //   "access_denied" - User denied access to your app
	    //   "immediate_failed" - Could not automatically log in the user
	    console.log('Sign-in state: ' + authResult['error']);
	  }
};*/

