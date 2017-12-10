const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");

const static = express.static(__dirname + "/public");

const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const data = require("./data");
const users = data.users;

const configRoutes = require("./routes");

passport.use(new LocalStrategy(
  function (username, password, done) {
      
      let userID = data.users.findUserByUsername(username);
      if (userID === -1) {
          return done("User does not exist");
      }
      else {
          let userInfo = data.users.findUserByID(userID);
          bcrypt.compare(password, userInfo.hashedPassword, function (err, res) {
              if (err) {
                  return done(err);
              }
              if (res === true) {
                  return done(null, userInfo);
              }
              else if (res === false) {
                  return done(null, false);
              }
          });
      }
  }
));
passport.serializeUser((user, obj) => {
  obj(null, user._id);
});

passport.deserializeUser((id, obj) => {
  let userInfo = data.users.findUserByID(id);
  if (userInfo === -1) {
      return obj("There is error");
  }
  else {
      obj(null, userInfo);
  }
});

const app = express();

const handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

//configRoutes(app);

app.get('/',
require('connect-ensure-login').ensureLoggedIn(),
function (req, res) {
    res.render('users/private', { userInfo: req.user });
});

app.get('/login',
function (req, res) {
    res.render('users/login');
});

app.post('/login',
passport.authenticate('local', { failureRedirect: '/login' }),
function (req, res) {
    res.redirect('/');
});


app.get('/private',
require('connect-ensure-login').ensureLoggedIn(),
function (req, res) {
    res.render('users/private', { userInfo: req.user });
});

app.listen(9001, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:9001");
});
