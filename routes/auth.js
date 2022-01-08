var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/logout', function(req, res){
    // remove the req.user property and clear the login session
   req.logout();
   req.session.destroy();
   // destroy session data
   res.redirect('/users/login');
 });

router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

router.get('/google/callback',passport.authenticate('google',{
    failureRedirect : '/denied',
  }),function(req, res){
    //console.log('aaabc',req.user);
    req.session.User = {
      id: req.user._id,
      fullname: req.user.name,
      role: req.user.role,
      image: req.user.image,
    }
    console.log.apply(req.session.User);
    res.redirect('/');
  }
  );

router.get('/current_student', (req, res) => {
    res.send(req.user);
  });
module.exports = router;