const express = require('express')
const router = express.Router()

const User = require('../models/user.model')

const { authenticateToken } = require('../services/auth.service')
const mapper_service = require('../services/response_mapper.service')


// (/user) route handles user operations (such as adding, updating or removing a profile-picture)

router.get('/current', authenticateToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })

    const userResponse = mapper_service.userDataResponse(user)
    res.status(200).json({ error: false, user: userResponse })
})

// validation exists on user signup
router.post('/username/email/exists', async (req, res) => {
    const usernameOrEmail = req.body.key
    const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] })

    return res.json({ exists: user != null && user != undefined })
})

module.exports = router
