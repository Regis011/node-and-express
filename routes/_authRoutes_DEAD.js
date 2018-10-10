import express from "express";
import config from '../config/config.js';
import keys from '../config/keys.js';
import passport from 'passport';
import PassStrategy from 'passport-google-oauth20';

const GoogleStrategy = PassStrategy.Strategy;
const router = express.Router();

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('Loggin out!');
});

// auth with Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get( config.GOOGLE_CALLBACK_URL, passport.authenticate('google'),(req, res) => {
  res.send('You are loggedin');
});

module.exports = router;
