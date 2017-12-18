const connection = require('../lib/connection')

const Article = connection.model('Article', {
  content: String,
  title: String,
})

module.exports = Article