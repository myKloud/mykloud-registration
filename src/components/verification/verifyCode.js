import { removeStorage, setStorage } from "../../shared/storage";
import { signUp } from "../../services/register";

const register = async (userObj) => {
  const response = await signUp({
    username: userObj.username + userObj.mail,
    firstName: userObj.firstname,
    lastName: userObj.lastname,
    password: userObj.password,
    recovery: userObj.recovery,
  });
  return response;
};

const verifyCode = (
  history,
  code,
  props,
  otp,
  setError,
  formValidation,
  userObj
) => {
  removeStorage();
  if (props.push) {
    history.push({
      pathname: props.push,
    });
  }
  if (props.resetPass) {
    props.setStage("reset");
  }

  // TODO
  if (`${otp.otp}` === code) {
    setStorage("welcome");
    setError("");
    register(userObj)
      .then((res) => {
        if (!res.exists) {
          history.push({
            pathname: "/welcome",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setError(() => formValidation.codeVerify.error);
  }
};

export default verifyCode;
