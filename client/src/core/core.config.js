(function () {
    'use strict';

	angular
		.module('app.core')
		.config(configTranslateProvider)
		.config(configLogProvider)
		.value('config', {
			appTitle: 'Memorize'
		});

	function configTranslateProvider($translateProvider) {
		$translateProvider.translations('en', {
			'MENU': 'Menu',
			'HOME': 'Home',
			'LEARN': 'Learn',
			'ADMIN': 'Admin',
			'SETTINGS': 'Settings'
		});

		$translateProvider.translations('hu', {
			'MENU': 'Menü',
			'HOME': 'Kezdőlap',
			'LEARN': 'Tanulás',
			'ADMIN': 'Adminisztráció',
			'SETTINGS': 'Beállítások'
		});

		$translateProvider.preferredLanguage('en');
	}

	function configLogProvider($logProvider) {
		if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
	}

})();