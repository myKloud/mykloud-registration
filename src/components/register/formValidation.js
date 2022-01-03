import Localization from "./localization";
const formValidation = {
  username: {
    name: "username",
    required: Localization.validation.username.required,
    length: Localization.validation.username.length,
    pattern: Localization.validation.username.pattern,
    isExist: Localization.validation.username.isExist,
  },

  password: {
    name: "password",
    required: Localization.validation.password.required,
    length: Localization.validation.password.length,
    pattern: Localization.validation.password.patteren,
  },

  confirmPassword: {
    name: "confirmPassword",
    required: Localization.validation.confirmPassword.required,
    match: Localization.validation.confirmPassword.match,
  },
};

export default formValidation;
