const connection = require('../lib/connection')

const User = connection.model('User', {
  displayName: String,
  email: String,
  githubId: String,
})

module.exports = User