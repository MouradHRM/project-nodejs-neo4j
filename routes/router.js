var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Doc = require('../models/doctorant');

var routes = express.Router();


routes.get('/', function(req, res, next) {
    /*Doc.getAll(function (err, results) {
        if (err) return next(err);
        res.render('homepage', {
            user: req.user,
            password: req.password,
            resultats: results.data
        });
    });*/
    res.render('login', {user: req.user, password: req.password});
});

/*routes.get('/', function(req, res, next) {
  res.render('homepage', {user: req.user, password: req.password});
});*/

routes.get('/dashboard', function(req, res, next) {
    Doc.getAll(function (err, results) {
        if (err) return next(err);
        res.render('dashboard', {
            user: req.user,
            password: req.password,
            resultats: results.data
        });
     });
    //res.render('dashboard', {user: req.user, password: req.password});
});

routes.get('/dashboard/:idDoct', function(req, res, next) {
    Doc.get(req.params.idDoct, function (err, results) {
        if (err) return next(err);
        res.render('doct_detail', {
            user: req.user,
            password: req.password,
            resultats: results.data
        });
     });
    //res.render('dashboard', {user: req.user, password: req.password});
});

routes.get('/dashboard/updatedoct/:idDoct', function(req, res, next) {
    Doc.getDoct(req.params.idDoct, function (err, results) {
        if (err) return next(err);
        res.render('form_doct', {
            user: req.user,
            password: req.password,
            resultats: results.data[0]
        });
     });
    //res.render('dashboard', {user: req.user, password: req.password});
});

routes.get('/login', function(req, res, next) {
    res.render('dashboard');
});

routes.post('/login', passport.authenticate('local', { successRedirect:'/dashboard', failureRedirect: '/login'}));

routes.get('/logout', function(req, res, next){
    req.logout();
    req.session.save((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
});

module.exports = routes;