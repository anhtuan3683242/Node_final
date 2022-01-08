const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('./../models/student')
const secrets = require('./../secret')



passport.serializeUser((student, done) => {
  done(null, student.id);
});

passport.deserializeUser((id, done) => {
  Student.findById(id)
    .then(student => {
      done(null, student);
    })
});

passport.use(
  new GoogleStrategy({
    clientID: secrets.googleClientID,
    clientSecret: secrets.googleClientSecret,
    callbackURL: '/auth/google/callback', 
  }, (accessToken,refeshToken,profile, done) => {
    //console.log('passport callback function')
    //console.log(profile.emails[0].value)
    //console.log(profile)
    var check = profile.emails[0].value.indexOf('@student.tdtu.edu.vn');
    if(check == -1){
      console.log('Không tồn tại chuỗi' );
      return done(null, false);
    }
    // Check if google profile exist.
    if (profile.id) {
      // console.log('test luu session')
      Student.findOne({googleId: profile.id})
        .then((existingStudent) => {
          if (existingStudent) {
            done(null, existingStudent);
          } else {
            new Student({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.name.familyName + ' ' + profile.name.givenName,
              role: 'student',
              image: profile._json.picture,
              class: 'none',
              falculty: 'none',
            })
              .save()
              .then(student => {
                //console.log('NEW ' + student);
                done(null, student);
              });
          }
        })
    }
  })
);