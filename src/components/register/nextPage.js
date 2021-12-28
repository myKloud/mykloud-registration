// To push the user to next page
import { cache } from "../../services/register";

const nextPage = async (
  setSubmit,
  validateHandler,
  userObj,
  setUserObj,
  setStorage,
  history,
  user,
  password,
  selectedMail,
  validate,
  formValidation,
  setUserMessage,
  setPassMessage,
  setPassConfirmMessage,
  confirmPassword,
  isExist
) => {
  setSubmit(true);
  const isValid = validateHandler(
    validate,
    formValidation,
    user,
    setUserMessage,
    setPassMessage,
    setPassConfirmMessage,
    password,
    confirmPassword,
    isExist
  );

  if (isValid) {
    userObj.username = user;
    userObj.mail = selectedMail.value;
    userObj.password = password;
    userObj.isValid = true;
    setUserObj(userObj);
    setStorage("info");

    const addCache = await cache(`${userObj.username}${userObj.mail}`);
    console.log(addCache);

    history.push({
      pathname: "/info",
      state: { user: user, password: password },
    });
  }
};

export default nextPage;
