require('AndroidSupport');
require('Sidebar');
require('NetworkIndicator');
require('Authentication');
require('Storage').put('data', {
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
});