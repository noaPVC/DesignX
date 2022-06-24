const express = require('express')
const router = express.Router()

// note: implement middleware using jwt [pull auth middleware service here]
// into every single request here, since wee need to determine which user
// issued the request to be able to return a satisfying response based on the user

// (/creation) route handles all single creations

// get single creation by a user
router.get('/:id', (req, res) => {

})

router.post('/new', (req, res) => {

})

router.delete('/remove/:id', (req, res) => {

})

router.put('/update/:id', (req, res) => {

})


module.exports = router
