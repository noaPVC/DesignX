const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected successfully!'))
  .catch((err) => console.err(err))

module.exports = mongoose
