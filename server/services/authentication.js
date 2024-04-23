function isAuthenticated(req, res, next) {
    if (req.session.isAuth) {
      return next();
    } else {
      res.redirect("/");
    }
  }
  module.exports = isAuthenticated;
  