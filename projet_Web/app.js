var createError = require('http-errors');
var express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter=require('./routes/articles');
var commentairesRouter=require('./routes/commentaires');
var categoriesRouter=require('./routes/categories');
var categoriesRouterId=require('./routes/categories');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//Permet de simplifier le chemin des fichiers existent a l'interieur de public
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
// app.use('/categories/:id', categoriesRouterId);
app.use('/commentaires', commentairesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//********************************* */
// Configuration de la stratégie d'authentification locale (par mot de passe)
passport.use(new LocalStrategy({
  usernameField: 'email', // Champs pour l'identification de l'utilisateur (par exemple, email)
}, async (email, password, done) => {
  try {
    // Vérifier les informations d'identification de l'utilisateur dans la base de données
    const user = await utilisateur.findOne({ email });
    if (!user || !user.verifyPassword(password)) {
      // Identifiants invalides
      return done(null, false);
    }
    // Authentification réussie
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));
// Configuration de la stratégie d'authentification par jeton
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key',
};
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Vérifier la validité du jeton et récupérer l'utilisateur correspondant depuis la base de données
    const user = await User.findById(payload.sub);
    if (!user) {
      // Utilisateur introuvable
      return done(null, false);
    }
    // Authentification réussie
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));
// Initialiser Passport.js
app.use(passport.initialize());
//********************************* */
  
module.exports = app;
