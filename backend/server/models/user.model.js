const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    minlength: 2,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    minlength: 2,
    required: true
  },
  username: {
    type: String,
    trim: true,
    minlength: 5,
    required: true,
    unique: true,
    dropDups: true
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  avatarProfileSource: {
    type: String,
    required: false,
    dropDups: true
  },
  joined: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('user', UserSchema)
module.exports = User
