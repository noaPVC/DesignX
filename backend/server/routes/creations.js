const express = require('express')
const router = express.Router()

// note: implement middleware using jwt [pull auth middleware service here]
// into every single request here, since wee need to determine which user
// issued the request to be able to return a satisfying response based on the user

// (/creations) route handles all list related creations
// consisting mostly of get routes

// get all creations by a user (gallery)
router.get('/all', (req, res) => {

})

// get recommendations for user on explore designs page
router.get('/explore', (req, res) => {

})

// get saved designs/creations by a user
router.get('/saved', (req, res) => {

})

// searches for a design/post by the given search term
router.get('/search/:term', (req, res) => {

})

// get recent designs/creations by user (on home page)
router.get('/recent', (req, res) => {

})

module.exports = router
