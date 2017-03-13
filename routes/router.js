var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Doc = require('../models/doctorant');
var Membre_jury = require('../models/membre_jury');

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

routes.get('/doctorants', function(req, res, next) {
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

routes.get('/doctorants/:idDoct', function(req, res, next) {
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
/******** Ahmed */
routes.get('/membres_jury', function(req, res, next) {
    Membre_jury.getAll(function (err, results) {
        if (err) return next(err);
        res.render('membres_jury', {
            user: req.user,
            password: req.password,
            resultats: results.data
        });
     });
    //res.render('dashboard', {user: req.user, password: req.password});
});

routes.get('/membres_jury/:idMembreJury', function(req, res, next) {
    Membre_jury.get(req.params.idMembreJury, function (err, results) {
        if (err) return next(err);
        res.render('membre_jury_detail', {
            user: req.user,
            password: req.password,
            resultats: results.data
        });
    });
    //res.render('dashboard', {user: req.user, password: req.password});
});

routes.post('/doctorants/:idDoct', function(req, res, next) {
    Doc.updateDoct(req.params.idDoct, req.body.nom, req.body.prenom, req.body.telephone, req.body.email,  function (err, results) {
        if (err) return next(err);         
        res.redirect('/doctorants/'+req.params.idDoct) ;
        
 });
});

routes.post('/doctorants/:idDoct/:idThese', function(req, res, next) {
    Doc.updateThese(req.params.idThese, req.body.intitule, req.body.type, req.body.domaine, req.body.date_debut,req.body.date_fin,  function (err, results) {
        if (err) return next(err);         
        res.redirect('/doctorants/'+req.params.idDoct) ;
        
 });
});

routes.get('/login', function(req, res, next) {
    res.render('dashboard');
});

routes.post('/login', passport.authenticate('local', { successRedirect:'/doctorants', failureRedirect: '/login'}));

routes.get('/logout', function(req, res, next){
    req.logout();
    req.session.save((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
});

module.exports = routes;