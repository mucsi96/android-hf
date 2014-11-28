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
			BACK: 'Back',
			WORDSETS: 'Word sets',
			NEW_WORDSET: 'New Word set',
			NO_WORDSETS: 'You don\'t have any word sets yet. Create one by clicking on "Add" button.',
	        ADD: 'Add',
	        CONFIRM_DELETE: 'Do you really want to delete this item?',
	        DELETE: 'Delete',
	        CANCEL: 'Cancel'
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
			BACK: 'Vissza',
			WORDSETS: 'Szókészletek',
			NEW_WORDSET: 'Új szókészlet',
	        NO_WORDSETS: 'Önnek még nincs szókészlete. Létrehozáshoz, kattintson a "Hozzáadás" gombra.',
	        ADD: 'Hozzáadás',
	        CONFIRM_DELETE: 'Valóban törölni akarja ezt a elemet?',
	        DELETE: 'Törlés',
	        CANCEL: 'Mégsem'
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