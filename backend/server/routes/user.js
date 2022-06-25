const express = require('express')
const router = express.Router()

// note: implement middleware using jwt [pull auth middleware service here]
// into every single request here, since wee need to determine which user
// issued the request to be able to return a satisfying response based on the user

// (/user) route handles user operations (such as adding, updating or removing a profile-picture)

module.exports = router
