// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
  // if (req.isAuthenticated())
  if (req.session.User) {
    next();
} else {
    res.redirect('/users/login');
}
}
module.exports = isLoggedIn;