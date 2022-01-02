import Localization from "./localization";

const formValidation = {
  email: {
    name: "email",
    required: Localization.validation.email.required,
    redundant: Localization.validation.email.redundant,
    isExist: Localization.validation.email.isExist,
  },
  number: {
    name: "number",
    required: Localization.validation.number.required,
    isExist: Localization.validation.number.isExist,
  },
};

export default formValidation;
