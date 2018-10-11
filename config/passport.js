import config from '../config/config.js';
import keys from '../config/keys.js';
import passport from 'passport';
import PassStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import UserModel from '../models/userModel';

const GoogleStrategy = PassStrategy.Strategy;
const User = UserModel;

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})



passport.use(new GoogleStrategy({
    clientID: keys.googleAuthClientID,
    clientSecret: keys.googleAuthSecret,
    callbackURL: config.GOOGLE_CALLBACK_FULL_URL
  }, ( accessToken, refreshToken, profile, done ) => {
    const id = new mongoose.Types.ObjectId();

    User.findOne({googleId: profile.id}, (err, currentUser) => {
      if(currentUser){
        // already have the user
        console.log('current user is => ', currentUser);
        done(null, currentUser);
      } else {
        // if not create new user in our db
        User.create({
          _id: id,
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        }, (err, newUser) => {
          if (err) return handleError(err);
          console.log('new user => ' + newUser);
          done(null, newUser)
        });
      }
    })

  }
));
