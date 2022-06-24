const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/login', (req, res) => {
  const data = req.body

  User.find({ email: data.email, password: data.password }, (err, result) => {
    if (!err) {
      if (result.length == 0) {
        res.status(400).json({ error: true, message: 'Invalid credentials!' })
        return
      }

      res.status(200).json(result)
      return
    }

    res.status(500).json({
      error: true,
      message: 'Something went wrong!'
    })
  })
})

router.post('/register', (req, res) => {
  const data = req.body

  new User({
    firstname: data.firstname,
    lastname: data.lastname,
    username: data.username,
    bio: data.bio,
    email: data.email,
    password: data.password,
    avatarProfileSource: data.avatarProfileSource
  }).save()
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.code && err.code == 11000) {
        res.status(400).json({ message: 'User already exists.' })
        return
      }

      if (err.message)
        res.status(400).json({ message: 'Validation failed.' })
    })
})

router.post('/refreshtoken', (req, res) => {

})

module.exports = router
