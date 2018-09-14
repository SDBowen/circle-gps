const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = data => {
  const errors = {};

  // Validate user login length
  if (!Validator.isLength(data.login, { min: 2, max: 20 })) {
    errors.input = "Login must be between 2 and 20 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
