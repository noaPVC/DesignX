const express = require('express')
const router = express.Router()

const User = require('../models/user.model')

const { authenticateToken } = require('../services/auth.service')
const mapper_service = require('../services/response_mapper.service')


// (/user) route handles user operations (such as adding, updating or removing a profile-picture)

router.get('/current', authenticateToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })

    if (!user)
        return res.status(400).json({ error: true, message: 'User does not exist!' })

    const userResponse = mapper_service.userDataResponse(user)
    res.status(200).json(userResponse)
})

module.exports = router
