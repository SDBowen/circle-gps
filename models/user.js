const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
