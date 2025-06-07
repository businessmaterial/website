const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  selectedExam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
  },
  subscription: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

// Update lastLogin on each login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = Date.now();
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User; 