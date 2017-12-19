const express = require('express')

const {
  Router
} = express
const router = Router()

const passport = require('../lib/passport')

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router