const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateProfileInput = data => {
  const errors = {};

  // Data must be in string format for Validator
  // Check for empty object and replace with string value.
  const userProfileInput = {};
  userProfileInput.deviceId = !isEmpty(data.deviceId) ? data.deviceId : "";
  userProfileInput.deviceName = !isEmpty(data.deviceName)
    ? data.deviceName
    : "";

  // Validate device ID is not empty
  if (Validator.isEmpty(userProfileInput.deviceId)) {
    errors.deviceId = "Device ID is required";
  }

  // Validate device name is not empty
  if (Validator.isEmpty(userProfileInput.deviceName)) {
    errors.deviceName = "Device name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
