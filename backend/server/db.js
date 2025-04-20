const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_CONNECTION_STRING

mongoose.set('strictQuery', false)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected successfully!'))
  .catch((err) => console.error(err))

module.exports = mongoose
