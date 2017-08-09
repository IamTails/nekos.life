/**
 * Created by Tom on 8/7/2017.
 */
module.exports = async (bot) => {
const sockio = require("socket.io");
const express  = require('express');
const cookie = require('cookie-parser');
const session = require('express-session');
const RDBStore = require('express-session-rethinkdb')(session);
const passport = require('passport');
const Strategy = require('./strategy.js');
const app = express();
bot.io = sockio.listen(app.listen(5000), {log: true});
console.log("Server started on port " + 5000);
let rdbStore = new RDBStore({
    connectOptions: {
        servers: [
            {host: 'localhost', port: 28015}

        ],
        db: 'neko',
        discovery: false,
        pool: true,
        buffer: 50,
        max: 1000,
        timeout: 20,
        timeoutError: 1000
    },
    table: 'session',
    sessionTimeout: 86400000,
    flushInterval: 60000,
    debug: false
});
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
const scopes = ['identify'];
passport.use(new Strategy({
    clientID: bot.user.id,
    clientSecret: bot.config.csec,
    callbackURL: 'http://localhost:5000/callback',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));
app.use(cookie());
app.use(session({
    key: 'sid',
    secret: bot.config.sessec,
    cookie: { maxAge: 860000 },
    store: rdbStore,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/View'));
app.use(express.static(__dirname + '/Script'));
app.use(express.static(__dirname));
app.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/me') } // auth success
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/info', checkAuth, function(req, res) {
   res.json(req.user);
});
app.get('/me',  checkAuth, async function(req, res) {
    let user = await bot.getUser(req.user.id);
    let fields = [{
        name: "Level ",
        value: user.level
    },
        {
            name: "Total experience ",
            value: user.exp
        }, {
            name: "Total nekos caught " + await bot.nekoc(),
            value: user.nekosall
        }, {
            name: "Current nekos " + await bot.nekov(),
            value: user.nekos
        }, {
            name: "Date registered",
            value: user.regdate
        }
    ];
    res.json(fields);
    bot.io.emit('me', fields);
    });
bot.io.on('connection', function(socket) {
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
    socket.on('test', console.log);
});
bot.r.db("rethinkdb").table("stats").get(["cluster"]).changes().run(bot.connection)
        .then(function(cursor) {
            cursor.each(function(err, item) {
                bot.io.emit("stats", item);
            });
        });

bot.r.db("rethinkdb").table("server_status").changes().run(bot.connection)
        .then(function(cursor) {
            cursor.each(function(err, item) {
                bot.io.emit("servers", item);
            });
        });
bot.r.db('neko').table('users').get("326080439662149633").changes().run(bot.connection)
    .then(function(cursor) {
        cursor.each(function(err, item) {
            bot.io.emit("user", item);
        });
    });
function sendTime() {
    bot.io.emit('time', { time: new Date().toJSON() });
}
setInterval(sendTime, 10000);
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
}};