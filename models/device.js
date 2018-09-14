const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema
const DeviceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  deviceId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Device = mongoose.model("devices", DeviceSchema);

module.exports = Device;
