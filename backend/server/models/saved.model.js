const mongoose = require('mongoose')

const SavedSchema = new mongoose.Schema({
    _designId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Saved = mongoose.model('saved', SavedSchema)
module.exports = Saved
