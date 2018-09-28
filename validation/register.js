const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = data => {
  const errors = {};

  // Data must be in string format for Validator
  // Check for empty object and replace with string value.
  const userRegistrationInput = {};
  userRegistrationInput.user = !isEmpty(data.user) ? data.user : "";
  userRegistrationInput.password = !isEmpty(data.password) ? data.password : "";
  userRegistrationInput.password2 = !isEmpty(data.password2)
    ? data.password2
    : "";

  // Validate user name length
  if (!Validator.isLength(userRegistrationInput.user, { min: 2, max: 20 })) {
    errors.user = "User must be between 2 and 20 characters";
  }

  // Validate user name is not empty
  if (Validator.isEmpty(userRegistrationInput.user)) {
    errors.user = "User field is required";
  }

  // Validate password is not empty
  if (Validator.isEmpty(userRegistrationInput.password)) {
    errors.password = "Password field is required";
  }

  // Validate user password length
  if (
    !Validator.isLength(userRegistrationInput.password, { min: 5, max: 30 })
  ) {
    errors.password = "Password must be at least 5 characters";
  }

  // Validate password is not empty
  if (Validator.isEmpty(userRegistrationInput.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  // Validate passwords match
  if (
    !Validator.equals(
      userRegistrationInput.password,
      userRegistrationInput.password2
    )
  ) {
    errors.password2 = "Passwords much match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
