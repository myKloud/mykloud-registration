import Localization from "./localization";

const formValidation = {
  email: {
    name: "email",
    required: Localization.validation.email.required,
    redundant: Localization.validation.email.redundant,
  },
  number: {
    name: "number",
    required: Localization.validation.number.required,
  },
};

export default formValidation;
