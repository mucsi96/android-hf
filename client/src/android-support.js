define('AndroidSupport', function () {
	if (window.Android) {
		Android.log('Hello for webApp v3');
		console.log = function(message) {
			Android.log(message);
		};
		console.error = function(error) {
			Android.error(error);
		};
		console.log('Consoles redirected.');
		console.log('Getting network status.');
		Android.getNetworkStatus();
	}
});