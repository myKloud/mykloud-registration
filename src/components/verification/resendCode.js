import { setResend, getResend } from "../../shared/storage";
import { sendOtp } from "../../services/register";

const resendCode = (
  userObj,
  otp,
  setIsTimer,
  setSeconds,
  setMin,
  setError,
  formValidation,
  interval
) => {
  sendOtp({
    value: userObj.recovery,
    otp: otp.otp,
  });

  interval = setInterval(() => {
    setIsTimer(true);
    setSeconds((seconds) => seconds - 1);
  }, 1000);

  if (getResend() === "first") {
    setResend("second");
    setMin(1);
    setSeconds(0);
  } else if (getResend() === "second") {
    setResend("third");
    setMin(15);
    setSeconds(0);
    setError(() => formValidation.resend.wait);
  } else if (getResend() === "third") {
    setMin(15);
    setSeconds(0);
    setError(() => formValidation.resend.wait);
  }
};

export default resendCode;
