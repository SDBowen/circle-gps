const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateLoginInput = data => {
  const errors = {};

  // Data must be in string format for Validator
  // Check for empty object and replace with string value.
  const userLoginInput = {};
  userLoginInput.user = !isEmpty(data.user) ? data.user : "";
  userLoginInput.password = !isEmpty(data.password) ? data.password : "";

  // Validate user name length
  if (!Validator.isLength(userLoginInput.user, { min: 2, max: 20 })) {
    errors.user = "User must be between 2 and 20 characters";
  }

  // Validate user name is not empty
  if (Validator.isEmpty(userLoginInput.user)) {
    errors.user = "User field is required";
  }

  // Validate user password length
  if (!Validator.isLength(userLoginInput.password, { min: 5, max: 30 })) {
    errors.password = "Password must be at least 5 characters";
  }

  // Validate password is not empty
  if (Validator.isEmpty(userLoginInput.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
