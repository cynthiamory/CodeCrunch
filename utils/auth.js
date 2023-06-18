// USER AUTHENTICATION MIDDLEWARE
const withAuth = (req, res, next) => {
  console.log(req.session.logged_in);

  // IF USER IS NOT LOGGED IN, REDIRECT TO LOGIN PAGE
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

// EXPORT MIDDLEWARE
module.exports = withAuth;
