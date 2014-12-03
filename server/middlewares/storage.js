var express = require('express'),
    _ = require('lodash'),
    middleware = express();

function sync(req, res, next) {
    var db = req.db,
        userStorage = db.get('userStorage'),
        mergedData;

    if (req.user) {
        console.log('Synchronizing data for user with id: ' + req.user.id);
        userStorage.findOne({userId: req.user.id}, function (e, data) {
            if(e) {
                return res.send({error: 'user data not found'});
            }
            if (data) {
                mergedData = _.merge(data, req.body, {userId: req.user.id});
                userStorage.update({userId: req.user.id}, mergedData);
            } else {
                mergedData = _.merge(req.body, {userId: req.user.id});
                userStorage.insert(mergedData);
            }
            res.send(mergedData);
        })
    } else {
        res.send({error:'not authenticated'});
    }
}

middleware.post('/sync', sync);

module.exports = middleware;
