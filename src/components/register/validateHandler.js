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
  const isValidUsername = validate(
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
  const isValidPassword = validate(
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
  const isValidConfirmPassword = validate(
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
    isValidUsername && isValidPassword && isValidConfirmPassword && !isExist
  );
};

export default validateHandler;
