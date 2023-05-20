const passport = require('passport');

// Middleware pour vérifier si l'utilisateur est authentifié
const isAuthenticated = passport.authenticate('jwt', { session: false });

// Middleware pour vérifier si l'utilisateur a le rôle "ADMIN"
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    // L'utilisateur est un administrateur
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
