const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/user.model')

const auth_service = require('../services/auth.service')
const file_service = require('../services/file.service')
const mapper_service = require('../services/response_mapper.service')

router.post('/login', async (req, res) => {
  const data = req.body
  const user = await User.findOne({ $or: [{ email: data.usernameOrEmail }, { username: data.usernameOrEmail }] })

  if (user) {
    const validPassword = await bcrypt.compare(data.password, user.password)

    if (validPassword) {
      const loginResponseBuilder = auth_service.loginResponseBuilder(user)
      return res.status(200).json(loginResponseBuilder)
    }

    return res.status(400).json({ error: true, message: 'Invalid credentials!' })
  }
  res.status(400).json({ error: true, message: 'User does not exist!' })
})

router.post('/register', file_service.upload.single('avatar'), async (req, res) => {
  if (req.fileError) {
    file_service.clearTemp()
    return res.status(400).json(req.fileError)
  }

  const data = mapper_service.registrationObjectMapper(req.body)

  if (!data.firstname || !data.lastname || !data.email || !data.username || !data.password)
    return res.status(400).json({ error: true, message: 'No arguments provided. Empty params..' })

  const user = new User(data)

  const uuid = uuidv4()
  const path = file_service.getUniqueFilePath(user._id, uuid, 'avatars')
  user.avatarProfileSource = path ? path : null

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  user.save()
    .then(() => {
      if (path)
        file_service.move(user._id, uuid, 'avatars')
      res.sendStatus(200)
    })
    .catch(err => {
      file_service.clearTemp()

      if (err.code && err.code == 11000)
        return res.status(400).json({ error: true, message: 'User already exists.' })

      res.status(400).json({ error: true, message: 'Insertion failed.' })
    })
})

router.post('/refreshtoken', auth_service.verifyRefreshToken, (req, res) => res.status(200).json(req.tokenObject))

module.exports = router
