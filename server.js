require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

const wikiRouter = require('./routes/wiki')
const authRouter = require('./routes/auth')
const config = require('./config')
const passport = require('./lib/passport')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// session => card key 
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true
  }
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
  res.render('index', {
    user: req.user
  })
})

app.use('/wiki', wikiRouter)
app.use('/auth', authRouter)

app.listen(8080)