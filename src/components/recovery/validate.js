import { isValidPhoneNumber } from "react-phone-number-input";

const validate = (input, value, setEmailMessage, setNumberMessage) => {
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let isValid = true;
  const domain = ["mykmail.io", "mykloudmail.io", "mkmail.io"];

  if (input.name === "email") {
    setEmailMessage("");

    if (!value.length) {
      setEmailMessage(input.required);
      isValid = false;
    } else if (!validEmail.test(value)) {
      setEmailMessage(input.required);
      isValid = false;
    } else if (
      domain.includes(value.slice(value.indexOf("@") + 1).toLowerCase())
    ) {
      setEmailMessage(input.redundant);
      isValid = false;
    }
  }

  if (input.name === "number") {
    setNumberMessage("");

    if (!value.length) {
      setNumberMessage(input.required);
      isValid = false;
    } else if (!isValidPhoneNumber(`+${value}`)) {
      setNumberMessage(input.required);
      isValid = false;
    }
  }

  return isValid;
};

export default validate;
