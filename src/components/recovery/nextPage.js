import { sendOtp, checkRecovery } from "../../services/register";
import { generateOTP } from "../../shared/util";
import { setOTP } from "../../actions/otpAction";
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
    const otp = generateOTP();
    props.dispatch(setOTP(otp));
    await setUserObj(userObj);
    setStorage("verification");
    let send = false;
    let check = false;

    check = await checkRecovery(method !== "phone" ? email : `+${number}`);

    if (!check.exists) {
      send = await sendOtp({
        value: method !== "phone" ? email : `+${number}`,
        otp: otp,
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
      }
    } else if (send.status === 200) {
      setResend("first");
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
