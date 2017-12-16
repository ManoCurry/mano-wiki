const connection = require('../lib/connection')

const Post = connection.model('Post', {
  content: String,
  title: String,
})

module.exports = Post

