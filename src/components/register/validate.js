// To make validation

const validate = (
  input,
  value,
  setUserMessage,
  setPassMessage,
  formValidation,
  setPassConfirmMessage,
  password,
  confirmPassword,
  isExist
) => {
  let isValid = true;
  const validUser = new RegExp("^[a-z0-9.]+[a-z0-9]$");
  const validPass =
    /^(?=.*[0-9])(?=.*[!@#$%^&*%()-_+.,/;'"\\ ])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*%()-_+.,/;'"\\ ]{8,128}$/;

  if (input.name === "username") {
    setUserMessage("");
    if (!value.length) {
      setUserMessage(input.required);
      isValid = false;
    } else if (value.length < 4 || value.length > 12) {
      setUserMessage(input.length);
      isValid = false;
    } else if (!validUser.test(value)) {
      setUserMessage(input.pattern);
      isValid = false;
    } else if (isExist) {
      setUserMessage(formValidation.username.isExist);
      isValid = false;
    }
  }

  if (input.name === "password") {
    setPassMessage("");
    if (!value.length) {
      setPassMessage(input.required);
      isValid = false;
    } else if (!validPass.test(value)) {
      setPassMessage(input.length);
      isValid = false;
    } else if (confirmPassword !== value) {
      setPassConfirmMessage(formValidation.confirmPassword.match);
      isValid = false;
    } else {
      setPassConfirmMessage("");
    }
  }
  if (input.name === "confirmPassword") {
    setPassConfirmMessage("");
    if (!value.length) {
      setPassConfirmMessage(input.required);
      isValid = false;
    } else if (password !== value) {
      setPassConfirmMessage(input.match);
      isValid = false;
    }
  }

  return isValid;
};

export default validate;
