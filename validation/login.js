const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateLoginInput = data => {
  const errors = {};

  // Data must be in string format for Validator
  // Check for empty object and replace with string value.
  const userLoginInput = {};
  userLoginInput.login = !isEmpty(data.login) ? data.login : "";
  userLoginInput.password = !isEmpty(data.password) ? data.password : "";

  // Validate user login length
  if (!Validator.isLength(userLoginInput.login, { min: 2, max: 20 })) {
    errors.login = "Login must be between 2 and 20 characters";
  }

  // Validate login is not empty
  if (Validator.isEmpty(userLoginInput.login)) {
    errors.login = "Login field is required";
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
