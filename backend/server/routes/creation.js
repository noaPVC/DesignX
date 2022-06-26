const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

const Design = require('../models/design.model')
const User = require('../models/user.model')

const auth_service = require('../services/auth.service')
const mapper_service = require('../services/response_mapper.service')
const file_service = require('../services/file.service')

// (/creation) route handles single creation actions

router.get('/:id', auth_service.authenticateToken, async (req, res) => {
    const parsedId = req.params.id
    const domain = `${req.protocol}://${req.get('host')}`

    if (!parsedId || !mongoose.isValidObjectId(parsedId))
        return res.status(400).json({ error: true, message: 'Invalid Id!' })

    const design = await Design.findById(parsedId)

    if (design) {
        const designResponse = mapper_service.designResponseBuilder(design, req.user._id, domain)
        return res.status(200).json(designResponse)
    }

    res.status(404).json({ error: true, message: 'Design does not exist.' })
})

router.post('/new', [auth_service.authenticateToken, file_service.upload.single('cover')], async (req, res) => {
    if (req.fileError) {
        file_service.clearTemp()
        return res.status(400).json(req.fileError)
    }

    const creator = await User.findById(req.user._id)
    if (!creator) return res.status(500).json({ error: true, message: 'Something went wrong...' })

    const data = mapper_service.designObjectMapper(req.body, creator)

    if (!data.caption || !data.description)
        return res.status(400).json({ error: true, message: 'Arguments missing!' })

    const design = new Design(data)

    const uuid = uuidv4()
    design.coverImageSource = file_service.getUniqueFilePath(design._id, uuid, 'designs')

    design.save()
        .then(() => {
            file_service.move(design._id, uuid, 'designs')
            res.sendStatus(200)
        })
        .catch(err => {
            file_service.clearTemp()
            if (err.code && err.code == 11000)
                return res.status(400).json({ error: true, message: 'Design already exists.' })

            res.status(400).json({ error: true, message: 'Insertion failed.' })
        })
})

router.delete('/remove/:id', auth_service.authenticateToken, async (req, res) => {
    const parsedId = req.params.id
    const userId = req.user._id

    if (!parsedId || !mongoose.isValidObjectId(parsedId))
        return res.status(400).json({ error: true, message: 'Invalid Id!' })

    const design = await Design.findById(parsedId)

    if (!design)
        return res.status(404).json({ error: true, message: 'No such design found.' })

    if (design._userId == userId) {
        await Design.findByIdAndDelete(parsedId)
        file_service.deleteContentById(parsedId, 'designs')
        return res.sendStatus(200)
    }

    res.status(401).json({ error: true, message: 'Unauthorized!' })
})

router.put('/update/:id', auth_service.authenticateToken, async (req, res) => {
    const parsedId = req.params.id
    const userId = req.user._id

    const data = mapper_service.updateDesignObjectMapper(req.body)

    if (!data.caption || !data.description)
        return res.status(400).json({ error: true, message: 'Arguments missing.' })

    if (!parsedId || !mongoose.isValidObjectId(parsedId))
        return res.status(400).json({ error: true, message: 'Invalid Id!' })

    const design = await Design.findById(parsedId)
    if (!design) return res.status(404).json({ error: true, message: 'No such design found.' })

    if (design._userId == userId) {
        await Design.findByIdAndUpdate(parsedId, data)
        return res.sendStatus(200)
    }

    res.status(401).json({ error: true, message: 'Unauthorized!' })
})


module.exports = router
