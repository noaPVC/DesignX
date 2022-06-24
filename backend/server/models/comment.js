const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    minlength: 2,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  authorProfileSource: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  authorName: {
    type: String,
    trim: true,
    minlength: 5,
    required: true
  },
  _authorId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  _designId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Comment = mongoose.model('comment', CommentSchema)
module.exports = Comment
