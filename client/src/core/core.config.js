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
			MENU: 'Menu',
			HOME: 'Home',
			LEARN: 'Learn',
			ADMIN: 'Admin',
			SETTINGS: 'Settings',
			LANGUAGE: 'Language',
			ENGLISH: 'English',
        	HUNGARIAN: 'Hungarian',
			BACK: 'Back'
		});

		$translateProvider.translations('hu', {
			MENU: 'Menü',
			HOME: 'Kezdőlap',
			LEARN: 'Tanulás',
			ADMIN: 'Adminisztráció',
			SETTINGS: 'Beállítások',
			LANGUAGE: 'Nyelv',
			ENGLISH: 'Angol',
        	HUNGARIAN: 'Magyar',
			BACK: 'Vissza'
		});

		$translateProvider.preferredLanguage('en');
		$translateProvider.useLocalStorage();
	}

	function configLogProvider($logProvider) {
		if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
	}

})();