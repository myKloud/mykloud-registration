const validateHandler = (
  validate,
  formValidation,
  user,
  setUserMessage,
  setPassMessage,
  setPassConfirmMessage,
  password,
  confirmPassword,
  isExist
) => {
  const isValid_username = validate(
    formValidation.username,
    user,
    setUserMessage,
    setPassMessage,
    formValidation,
    setPassConfirmMessage,
    password,
    confirmPassword,
    isExist
  );
  const isValid_password = validate(
    formValidation.password,
    password,
    setUserMessage,
    setPassMessage,
    formValidation,
    setPassConfirmMessage,
    password,
    confirmPassword,
    isExist
  );
  const isValid_confirm_password = validate(
    formValidation.confirmPassword,
    confirmPassword,
    setUserMessage,
    setPassMessage,
    formValidation,
    setPassConfirmMessage,
    password,
    confirmPassword,
    isExist
  );

  return (
    isValid_username && isValid_password && isValid_confirm_password && !isExist
  );
};

export default validateHandler;
