const config = {
  port: process.env.PORT || 8080,
  sessionSecret: process.env.SESSION_SECRET || 'manolab',
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
}

module.exports = config