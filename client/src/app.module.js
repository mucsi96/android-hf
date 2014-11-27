(function () {
    'use strict';

    angular
        .module('app', [
            'app.core',
            'app.layout',
            'app.settings'
        ]);

    var data = {
	wordsets: [
		{
			name: 'Wordset1',
			words: [
				{
					hu: 'Alma',
					en: 'Apple'
				},
				{
					hu: 'Narancs',
					en: 'Orange'
				},
				{
					hu: 'Szilva',
					en: 'Plum'
				},
				{
					hu: 'Répa',
					en: 'Carrot'
				},
			]
		}
	]
};   

})();