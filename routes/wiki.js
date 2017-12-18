const express = require('express')

const Article = require('../models/Article')
const {
  Router
} = express

const router = Router()

router.get('/:title', async (req, res) => {
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
router.get('/:title/edit', async (req, res) => {
  const { title } = req.params
  const article = await Article.findOne({
    title,
  })

  let content

  if (article == null) {
    content = ''
  } else {
    content = article.content
  }

  res.render('form', {
    title,
    content,
  })
})

// post upsert
router.post('/:title/edit', async (req, res) => {
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

module.exports = router