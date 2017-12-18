const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const wikiRouter = require('./routes/wiki')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/wiki', wikiRouter)

app.listen(8080)