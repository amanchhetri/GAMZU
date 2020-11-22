const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.displayName = !isEmpty(data.displayName) ? data.displayName : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!Validator.isLength(data.displayName, { min: 2, max: 40 })) {
    errors.displayName = "Display Name needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.displayName)) {
    errors.displayName = "Display Between field is required";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  if (!isEmpty(data.discord)) {
    if (!Validator.isURL(data.discord)) {
      errors.discord = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitch)) {
    if (!Validator.isURL(data.twitch)) {
      errors.twitch = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.steam)) {
    if (!Validator.isURL(data.steam)) {
      errors.steam = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
