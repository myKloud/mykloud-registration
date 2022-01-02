import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import VerificationInput from "../common/verificationInput";
import { useHistory } from "react-router-dom";
import "./Verification.scss";
import Localization from "./localization";
import formValidation from "./formValidation";
import verifyCode from "./verifyCode";
import previous from "./previous";
import {
   setResend, getResend 
} from "../../shared/storage";
import { sendOtp } from "../../services/register";

let interval;
const Verification = (props) => {
  let minutes = 15; 
  let sec = 59;
  const userObj = props.userReducer;
  const recovery = userObj.recovery || props.recovery ;
  const [seconds, setSeconds] = useState(0);
  const [min, setMin] = useState(0);
  const [code, setCode] = useState("");
  const [isTimer, setIsTimer] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const otp = props.otpReducer;
  let reduxMin = userObj.min;
  let reduxSeconds = userObj.seconds;



const resendCode = () => {
  sendOtp({
    value: userObj.recovery,
    type: userObj.method !== "phone" ? 0 : 1,
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
    setMin(minutes);
    setSeconds(0);
    setError(() => formValidation.resend.wait);
  } else if (getResend() === "third") {
    setMin(minutes);
    setSeconds(0);
    setError(() => formValidation.resend.wait);
  }
};

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang, userObj.recovery]);

  const checkResend = ()=>{
    if (reduxMin !== 0) {
      setMin(reduxMin);
    }

    if (reduxSeconds > 0) {
      setSeconds(reduxSeconds);
    }
    if (reduxMin === 0 && reduxSeconds === 0){
    if (getResend() === "first"  ) {
      setMin(1);
      setSeconds(0);
    }
    if (getResend() === "second" ) {
      setMin(1);
      setSeconds(0);
    }

    if (getResend() === "third" ) {
      setMin(minutes);
      setSeconds(0);
      setError(() => formValidation.resend.wait);
    }
}
    interval = setInterval(() => {
      setIsTimer(true);
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  }

  useEffect(() => {
    checkResend()
  }, []);

  useEffect(() => {
    if (seconds < 0 && min > 0) {
      setMin((min) => min - 1);
      setSeconds(sec);
    }

    if (seconds === 0 && min === 0 && isTimer) {
      clearInterval(interval);
    }
  }, [seconds, min]);

  useEffect(() => {
    userObj.min = min;
  }, [min]);

  useEffect(() => {
    if (seconds > 0) {
      userObj.seconds = seconds;
    }
  }, [seconds]);

  return (
    <>
      <div className="form_container verification_container">
        <div className="form_wrapper">
          <h1 className="form_title">{`${Localization.title}`}</h1>
          <p className="subtitle mb-8">{recovery}</p>

          <div className="input_wrapper">
            {error === "Incorrect code, try again." ? (
              <VerificationInput
                setCode={setCode}
                character="errorCharacter"
                setError={setError}
              />
            ) : (
              <VerificationInput setCode={setCode} setError={setError} />
            )}

            {error ? <p className="error">{error}</p> : ""}

            <div className="flex mt-4">
              <p className="info mr-1">{Localization.not_recieve}</p>
              {min > 0 || (min === 0 && seconds > 0) ? (
                <>
                  <p className="timer">
                    Wait for {min < 10 ? `0${min}` : min}:
                    {seconds < 10 ? `0${seconds}` : seconds} sec
                  </p>
                </>
              ) : (
                <>
                  <p className="action" onClick={() => resendCode()}>
                    {Localization.resend}
                  </p>
                </>
              )}
            </div>

            <div className="flex mt-4">
              {userObj.method === "email" ? (
                <p className="info mr-1">{Localization.not_your_email}</p>
              ) : (
                <p className="info mr-1">{Localization.not_your_number}</p>
              )}

              <p className="action" onClick={() => previous(props, history, userObj, min, seconds)}>
                {Localization.change}
              </p>
            </div>

            <div className="flex mt-4 justify-between ...">
              <button className="pre" onClick={() => previous(props, history, userObj, min, seconds)}>
                {Localization.previous}
              </button>
              <button className="verify" onClick={() => verifyCode(history, code, props, otp, setError, formValidation , userObj)}>
                {Localization.verify}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ languageReducer, userReducer, otpReducer }) => ({
  languageReducer,
  userReducer,
  otpReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
