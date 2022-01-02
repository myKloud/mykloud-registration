import { setStorage } from "../../shared/storage";
import { signUp, verifyOtp } from "../../services/register";

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

const verify = async (recovery, code) => {
  const response = await verifyOtp({ value: recovery, otp: code });
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
  if (props.push) {
    history.push({
      pathname: props.push,
    });
  }
  if (props.resetPass) {
    props.setStage("reset");
  }

  if (verify(userObj.recovery, code) === "validated successfully") {
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
