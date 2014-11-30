var express = require('express'),
    middleware = express(),
    authentication = require('./authentication');

function getStorage(req, res, next) {
    var user = authentication.getUser(req);
    if (user) {
        console.log('Getting form storage for user with id: ' + user.id);
    }
    res.send([{
        id: 4,
        name: 'ServerWordset1',
        words: [{
            hu: 'Alma',
            en: 'Apple'
        }, {
            hu: 'Narancs',
            en: 'Orange'
        }, {
            hu: 'Szilva',
            en: 'Plum'
        }, {
            hu: 'Répa',
            en: 'Carrot'
        }]
    }, {
        id: 3,
        name: 'ServerWordset2',
        words: [{
            hu: 'Alma',
            en: 'Apple'
        }, {
            hu: 'Narancs',
            en: 'Orange'
        }]
    }, {
        id: 4,
        name: 'ServerWordset3',
        words: [{
            hu: 'Alma',
            en: 'Apple'
        }, {
            hu: 'Narancs',
            en: 'Orange'
        }, {
            hu: 'Szilva',
            en: 'Plum'
        }]
    }]);
}

function putStorage(req, res, next) {
    var user = authentication.getUser(req);
    if (user) {
        console.log('Puting in storage for user with id: ' + user.id);
    }
    res.send('');
}

middleware.get('/storage', getStorage);
middleware.post('/storage', putStorage);

module.exports = middleware;
