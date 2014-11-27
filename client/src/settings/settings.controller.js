(function () {
    'use strict';

	angular
		.module('app.settings')
		.controller('SettingsController', SettingsController);

	function SettingsController ($translate) {
		var vm = this,
			languages = [{
		        'name': 'ENGLISH',
		        'key': 'en'
		    }, {
		        'name': 'HUNGARIAN',
		        'key': 'hu'
		    }];

	    vm.changeLanguage = function (langKey) {
	        $translate.use(langKey);
	        updateLanguageDropDown();
	    };

	    function updateLanguageDropDown () {
	        var langKey = $translate.use(),
	        	others = [];

	        languages.forEach(function (language) {
	            if (language.key === langKey) {
	                vm.currentLanguage = translate(language);
	            } else {
	                others.push(translate(language));
	            }
	        });
	        vm.selectableLanguages = others;
	    }

	    function translate(language) {
	    	return {
	    		key: language.key,
	    		name: $translate.instant(language.name),
	    	}
	    }

	    updateLanguageDropDown();
	}   

})();