const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./db')
const cors = require('cors')

// required routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const designRouter = require('./routes/design')
const designsRouter = require('./routes/designs')

const app = express()
const PORT = 3000

// Allow requests from localhost:4200
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:4200'
}))

app.use('/usercontent', express.static(__dirname + '/usercontent'))

// routes
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/design', designRouter)
app.use('/designs', designsRouter)

// wildcard route handling unknown requests
app.get('**', (req, res) => {
  res.status(400).json({
    error: true,
    message: 'Unknown URI.'
  })
})

app.listen(PORT)
