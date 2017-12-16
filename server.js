const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('views', './views')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
  res.render('index')
})

/**
 * Routes
 * - /: list
 * - /new | submit form
 * - /:postId  | post
 * - /:postId/edit  |  form
 */

 app.get('/new', (req, res) => {
   res.render('form')
 })

app.listen(8080)