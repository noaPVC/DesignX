const express = require('express')
const router = express.Router()

const Design = require('../models/design.model')
const Saved = require('../models/saved.model')

const { authenticateToken } = require('../services/auth.service')
const mapper_service = require('../services/response_mapper.service')

// TODO: return any list item below as a (mapper_service.designResponseBuilder)

// (/designs) route handles all list related designs

// get all designs by a user (gallery)
router.get('/all', authenticateToken, async (req, res) => {
    const designs = await Design.find({ _userId: req.user._id })
    res.status(200).json(designs)
})

// get recommendations for user on explore designs page (for now just any designs that are not his own)
router.get('/explore', authenticateToken, async (req, res) => {
    const recommendations = await Design.find({ _userId: { $ne: req.user._id } })
    res.status(200).json(recommendations)
})

// get saved designs/creations by a user (also referred to as bookmarked designs)
router.get('/saved', authenticateToken, async (req, res) => {
    const savedDesigns = await Saved.find({ _userId: req.user._id })
    res.status(200).json(savedDesigns)
})

// searches for a design/post by the given search term
router.get('/search/:term', authenticateToken, async (req, res) => {
    const searchTerm = req.params.term

    const results = await Design.find({ $or: [{ tags: { $regex: `/.*${searchTerm}.*/` } }, { caption: { $regex: `/.*${searchTerm}.*/` } }] })
    res.status(200).json(results)
})

// get recent designs/creations (max of 5) by user (on home page)
router.get('/recent', authenticateToken, async (req, res) => {
    const recents = await Design.find({ _userId: req.user._id }).sort({ createdAt: -1 }).limit(5)
    res.status(200).json(recents)
})

module.exports = router
