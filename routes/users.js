var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

const user = { id: 1, username: 'oboussaid', password: '123456789', displayName: 'Omar', email: 'omar.boussaid@univ-lyon2.fr' };

function findUser (username, callback) {
    if (user.username === username) {
        return callback(null, user);
    }
    return callback(null, null);
}

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    findUser(username, done);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        findUser(username, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
