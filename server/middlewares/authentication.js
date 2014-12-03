var express = require('express'),
    middleware = express(),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    GooglePlusStrategy = require('passport-google-plus'),
    GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'],
    GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'],
    SECRET = process.env['SECRET'];

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GooglePlusStrategy({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
    },
    function(tokens, profile, done) {
        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.
        return done(null, profile, tokens);
    }));

/*function getUser(req) {
    if (req.isAuthenticated()) {
        return req.user;
    }
}

function getUserMiddleware(req, res, next) {
    req.getUser = getUser;
    next();
}*/

middleware.use(bodyParser.json());
middleware.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SECRET
}));
middleware.use(passport.initialize());
middleware.use(passport.session());
//middleware.use(getUserMiddleware);
middleware.all('/auth/google/callback', passport.authenticate('google'), function(req, res) {
    // Return user profile back to client
    res.send(req.user);
});
middleware.get('/auth/status', function(req, res) {
    if (req.user) {
        res.send({
            connected: true,
            user: req.user
        });
    } else {
        res.send({
            connected: false
        });
    }
    
})

module.exports = middleware;
