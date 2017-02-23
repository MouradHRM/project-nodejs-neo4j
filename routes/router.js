var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = express.Router();

routes.get('/', function(req, res, next) {
  res.render('homepage', {user: req.user, password: req.password});
});

routes.get('/login', function(req, res, next) {
    res.render('login');
});

routes.post('/login', passport.authenticate('local', { successRedirect:'/', failureRedirect: '/login'}));

routes.get('/logout', function(req, res, next){
    req.logout();
    req.session.save((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
});

module.exports = routes;