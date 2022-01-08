// route middleware để kiểm tra một user đã admin hay chưa?
function isAdminLoggedIn(req, res, next) {
    // if (req.isAuthenticated())
    //console.log(req.session.User.role)
    if (req.session.User) {
        if (req.session.User.role !="admin") {
            res.redirect('/');
        }
        if(req.session.User.role =="admin"){
            next();
        }
        else{
            res.redirect('/users/login');
        }
  } else {
      res.redirect('/users/login');
  }
}
module.exports = isAdminLoggedIn;