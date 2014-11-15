window.gapi.signin.render('google-button', {
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
};





function checkOnlineStatus() {
	if ((window.Android && window.Android.isOnline()) || !window.Android) {
		$(document.body).css('background', 'green');
	} else {
		$(document.body).css('background', 'red');
	}
}

checkOnlineStatus();

setInterval(checkOnlineStatus, 1000);