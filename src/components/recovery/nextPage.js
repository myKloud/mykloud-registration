import { sendOtp, checkRecovery } from "../../services/register";
import { setStorage, getResend, setResend } from "../../shared/storage";
import { setUserObj } from "../../actions/userAction";

const nextPage = async (
  validateHandler,
  userObj,
  method,
  email,
  number,
  props,
  history,
  setEmailMessage,
  setNumberMessage,
  formValidation
) => {
  const isValid = validateHandler();
  if (isValid) {
    userObj.method = method;
    userObj.recovery = method !== "phone" ? email : `+${number}`;
    await setUserObj(userObj);
    setStorage("verification");
    let send = false;
    let check = false;

    check = await checkRecovery({
      value: method !== "phone" ? email : `%2B${number}`,
      type: method !== "phone" ? 0 : 1,
    });

    if (!check.exists) {
      send = await sendOtp({
        value: method !== "phone" ? email : `+${number}`,
        type: method !== "phone" ? 0 : 1,
      });
    } else {
      if (method !== "phone") {
        setEmailMessage(formValidation.email.isExist);
      } else {
        setNumberMessage(formValidation.number.isExist);
      }
    }

    if (getResend() && send.status === 200) {
      if (getResend() === "second") {
        setResend("third");
      } else if (getResend() === "first") {
        setResend("second");
      } else {
        setResend("first");
      }
    }

    if (!check.exists) {
      history.push({
        pathname: "/verification",
        state: {
          value: method !== "phone" ? email : `+${number}`,
          method: method,
        },
      });
    }
  }
};

export default nextPage;
