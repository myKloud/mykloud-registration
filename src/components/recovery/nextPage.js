import { sendOtp } from "../../services/register";
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
  history
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

    send = await sendOtp({
      value: method !== "phone" ? email : `+${number}`,
      otp: otp,
    });

    if (getResend()) {
      if (getResend() === "second") {
        setResend("third");
      } else if (getResend() === "first") {
        setResend("second");
      }
    } else {
      setResend("first");
    }

    history.push({
      pathname: "/verification",
      state: {
        value: method !== "phone" ? email : `+${number}`,
        method: method,
      },
    });
  }
};

export default nextPage;
