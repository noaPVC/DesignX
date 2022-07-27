const mongoose = require('mongoose')

const LikedSchema = new mongoose.Schema({
    _designId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Liked = mongoose.model('liked', LikedSchema)
module.exports = Liked
