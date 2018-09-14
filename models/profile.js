const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  devices: [
    {
      deviceId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ]
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;
