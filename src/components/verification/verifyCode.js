import { setStorage } from "../../shared/storage";
import { signUp, verifyOtp } from "../../services/register";

const register = async (userObj) => {
  const response = await signUp({
    username: userObj.username + userObj.mail,
    firstName: userObj.firstname,
    lastName: userObj.lastname,
    password: userObj.password,
    recovery: userObj.recovery,
    recoveryType: userObj.method === "phone" ? 0 : 1,
  });
  return response;
};

const verify = async (recovery, code) => {
  const response = await verifyOtp({ value: recovery, otp: code });
  return response;
};

const verifyCode = async (
  history,
  code,
  props,
  otp,
  setError,
  formValidation,
  userObj
) => {
  let check = await verify(userObj.recovery, code);

  if (props.push) {
    history.push({
      pathname: props.push,
    });
  }
  if (props.resetPass) {
    props.setStage("reset");
  }

  if (check === "Valid OTP") {
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
