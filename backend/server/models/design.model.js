const mongoose = require('mongoose')

const DesignSchema = new mongoose.Schema({
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
  },
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

function arrayLimit(val) {
  return val.length <= 10;
}

const Design = mongoose.model('design', DesignSchema)
module.exports = Design
