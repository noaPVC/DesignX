const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

const Design = require('../models/design.model')
const User = require('../models/user.model')
const Saved = require('../models/saved.model')

const { authenticateToken } = require('../services/auth.service')
const mapper_service = require('../services/response_mapper.service')
const file_service = require('../services/file.service')

// (/creation) route handles single creation actions

router.get('/:id', authenticateToken, async (req, res) => {
    const parsedId = req.params.id

    if (!parsedId || !mongoose.isValidObjectId(parsedId))
        return res.status(400).json({ error: true, message: 'Invalid Id!' })

    const design = await Design.findById(parsedId)

    if (design) {
        const designResponse = mapper_service.designResponseBuilder(design, req.user._id)
        return res.status(200).json(designResponse)
    }

    res.status(404).json({ error: true, message: 'Design does not exist.' })
})

router.post('/new', [authenticateToken, file_service.upload.single('cover')], async (req, res) => {
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
            res.status(200).json({ error: false, message: 'Design was created!' })
        })
        .catch(err => {
            file_service.clearTemp()
            if (err.code && err.code == 11000)
                return res.status(400).json({ error: true, message: 'Design already exists.' })

            res.status(400).json({ error: true, message: 'Insertion failed.' })
        })
})

router.delete('/remove/:id', authenticateToken, async (req, res) => {
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
        return res.status(200).json({ error: false, message: 'Design deleted!' })
    }

    res.status(401).json({ error: true, message: 'Unauthorized!' })
})

router.put('/update/:id', authenticateToken, async (req, res) => {
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
        return res.status(200).json({ error: false, message: 'Design was updated!' })
    }

    res.status(401).json({ error: true, message: 'Unauthorized!' })
})

router.get('/save/:id', authenticateToken, async (req, res) => {
    const parsedId = req.params.id
    const userId = req.user._id

    if (parsedId == userId) return res.status(400).json({ error: true, message: 'Error bookmarking own design.' })

    if (!mongoose.isValidObjectId(parsedId)) return res.status(400).json({ error: true, message: 'Invalid id!' })

    const savedDesign = new Saved(parsedId, userId)
    savedDesign.save()
        .then(() => res.status(200).json({ error: false, message: 'Saved design.' }))
        .catch(err => res.status(500).json({ error: true, message: 'Insertion failed.' }))
})

module.exports = router
