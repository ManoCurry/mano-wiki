const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy

const User = require('../models/User')

const config = require('../config')

const strategyOptions = {
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: `http://localhost:${config.port}/auth/github/callback`,
}

const githubHandler = async (accessToken, refreshToken, profile, cb) => {
  try {
    let user = await User.findOne({
      githubId: profile.id,
    })
  
    if (user == null) {
      user = new User({
        githubId: profile.id,
        email: profile.email,
        displayName: profile.displayName,
      })
  
      await user.save()
    }
    cb(null, user)
  } catch (err) {
    cb(err)
  }
}

passport.use(new GithubStrategy(strategyOptions, githubHandler));

passport.serializeUser((user, done) => {
  console.log(user, 'serilized')
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log(id)
  User.findById(id, function(err, user) {
    console.log(user)
    done(err, user);
  });
});
module.exports = passport
