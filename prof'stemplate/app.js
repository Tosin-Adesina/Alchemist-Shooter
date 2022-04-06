
require('./db');
require('./auth');

const passport = require('passport');
const express = require('express');
const path = require('path');

const game = require('./routes/game');
const instructions = require('./routes/instructions');
const leaderboard = require('./routes/leaderboard');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', game);
app.use('/instructions', instructions);
app.use('/leaderboard', leaderboard);

app.listen(3000);