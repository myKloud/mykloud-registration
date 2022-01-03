// To check the username

const isUserExist = async (
  value,
  selected,
  checkUser,
  setIsExist,
  setUserMessage,
  formValidation
) => {
  if (!value) {
    return;
  }
  const result = await checkUser(`${value}${selected.value}`);
  setIsExist(result.exists);
  if (result.exists) {
    setUserMessage(formValidation.username.isExist);
  } else {
    setUserMessage("");
  }
};

export default isUserExist;
