const mongoose = require('mongoose')

const ViewedSchema = new mongoose.Schema({
    _designId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Viewed = mongoose.model('viewed', ViewedSchema)
module.exports = Viewed
