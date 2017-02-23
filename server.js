var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var routes = require('./routes/router');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('views',__dirname + '/views');
app.set('view engine', 'pug');

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

app.use('/', routes);
//app.use(users);

var neo4j = require('node-neo4j');
db = new neo4j('http://neo4j:123456789@localhost:7474');


app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use(express.static(__dirname + '/public'));


var server = app.listen(3000, function () {
    console.log("Le site est lancé sur le port 3000");
});