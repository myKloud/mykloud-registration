import Localization from "./localization";
const formValidation = {
  firstName: {
    name: "firstName",
    required: Localization.validation.firstName.required,
  },
  lastName: {
    name: "lastName",
    required: Localization.validation.lastName.required,
  },
  name: {
    requiredBoth: Localization.validation.name.requiredBoth,
  },
  month: {
    name: "month",
  },
  year: {
    name: "year",
    format: Localization.validation.year.format,
  },
  birthDay: {
    required: Localization.validation.birthDay.required,
    notValid: Localization.validation.birthDay.notValid,
    minimum: 13,
  },
  captcha: {
    required: Localization.validation.captcha.required,
  },
};

export default formValidation;
