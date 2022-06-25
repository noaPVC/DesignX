const express = require('express')
const router = express.Router()

const auth_service = require('../services/auth.service')

// (/creation) route handles all single creation actions

router.get('/:id', auth_service.authenticateToken, (req, res) => {
    res.status(200).json(req.user)
})

router.post('/new', auth_service.authenticateToken, (req, res) => {

})

router.delete('/remove/:id', auth_service.authenticateToken, (req, res) => {

})

router.put('/update/:id', auth_service.authenticateToken, (req, res) => {

})


module.exports = router
