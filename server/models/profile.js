const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  deviceId: {
    type: String,
    required: true
  },
  deviceName: {
    type: String,
    required: true
  }
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
