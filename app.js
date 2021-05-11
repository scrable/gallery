const express = require("express");
const home = require('./routes/home')
const path = require('path');
const session = require('express-session');

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'greetings', saveUninitialized: false, resave: true,
    cookie: { maxAge: 60000000, httpOnly: true, secure: false }
}));

app.get('/', function (req, res) {
    home.list(req, res)
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.all('*', function(req, res) {
    res.redirect("/");
});

app.listen(8997);

module.exports = app;