const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const Article = require('./models/Article')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

// Route
app.get('/wiki/:title', async (req, res) => {
  const { title } = req.params
  const article = await Article.findOne({
    title,
  })
  
  if (article == null) {
    res.status(404).send('Loser')
  } else {
    const { content } = article
    res.render('show', {
      title,
      content,
    })
  }
})


// get edit
app.get('/wiki/:title/edit', (req, res) => {
  const { title } = req.params

  res.render('form', {
    title,
  })
})

// post upsert
app.post('/wiki/:title/edit', async (req, res) => {
  const { content } = req.body
  const { title } = req.params
  let article = await Article.findOne({
    title
  })

  if (article == null) {
    article = new Article({
      title
    })
  }

  article.content = content

  await article.save()

  res.redirect(`/wiki/${title}`)
})

app.listen(8080)