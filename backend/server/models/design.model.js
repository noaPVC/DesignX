const mongoose = require('mongoose')

const DesignSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  caption: {
    type: String,
    trim: true,
    minlength: 5,
    required: true
  },
  description: {
    type: String,
    trim: true,
    minlength: 20,
    required: true
  },
  coverImageSource: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  views: {
    type: Number,
    required: false,
    default: 0
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  },
  tags: {
    type: [{ type: String }],
    validate: [arrayLimit]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creatorImageSource: {
    type: String,
    required: false,
  },
  creatorName: {
    type: String,
    required: true
  }
})

function arrayLimit(val) {
  return val.length <= 10;
}

const Design = mongoose.model('design', DesignSchema)
module.exports = Design
