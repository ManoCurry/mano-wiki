const mongoose = require('mongoose')

const connection = mongoose.createConnection('mongodb://localhost/test', {
  useMongoClient: false,
})

mongoose.Promise = global.Promise

module.exports = connection