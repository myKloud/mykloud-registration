import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import VerificationInput from "../common/verificationInput";
import { useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import Localization from "./localization";
import {
  removeStorage,
  setStorage,
  setFirstResend,
  setSecondResend,
  setThirdResend,
  getFirstResend,
  getSecondResend,
  getThirdResend,
  removeResend,
} from "../../config/storage";

const CodeVerification = (props) => {
  const location = useLocation();
  const [times, setTimes] = useState(1);
  const recovery = props.recovery || location.state.value || "01012345678";
  const [seconds, setSeconds] = useState(59);
  const [data, setData] = useState("");
  const [min, setMin] = useState(0);
  const form_validation = {
    resend: {
      name: "resend",
      wait: Localization.validation.resend.wait,
    },
  };
  const [error, setError] = useState(() => form_validation.resend.wait);

  const resendCode = () => {
    if (times < 3) {
      setTimes(() => times + 1);
    } else {
      removeResend();
      setTimes(() => 1);
      setFirstResend(recovery, "13");
    }
    setMin(0);
    setSeconds(59);
  };

  useEffect(() => {
    if (!getFirstResend()) {
      setFirstResend(recovery, "13");
    } else if (getFirstResend().recoveryData === location.state.value) {
      if (!getSecondResend()) {
        setTimes(() => 2);
      } else if (getSecondResend().recoveryData === location.state.value) {
        if (getSecondResend() && !getThirdResend()) {
          setTimes(() => 3);
        } else if (getThirdResend()) {
          setMin(14);
          setTimes(() => 4);
        } else {
          setSecondResend(recovery, "15");
        }
      }
    } else {
      setFirstResend(recovery, "13");
    }

    if (seconds > 0) {
      setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    // return () => clearInterval(interval);
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang, location.state.value]);

  useEffect(() => {
    if (times === 2) {
      setSecondResend(recovery, "15");
    }

    if (times === 3) {
      setThirdResend(recovery, "18");
      setMin(14);
    }
  }, [times]);

  useEffect(() => {
    if (seconds < 0 && min > 0) {
      setMin((min) => min - 1);
      setSeconds(59);
    }
  }, [seconds]);

  const history = useHistory();
  const pre = () => {
    setStorage("recovery");
    if (props.setStage) {
      props.setStage("recovery");
    } else {
      history.push({
        pathname: "/recovery",
      });
    }
  };

  const verifyCode = () => {
    removeStorage();
    if (props.push) {
      history.push({
        pathname: props.push,
      });
    }
    if (props.resetPass) {
      props.setStage("reset");
    }

    const otp = props.otpReducer.otp;
    // TODO
    if (otp === "verify code from verfication input") {
    }
  };

  return (
    <>
      <div className="form_container verification_container">
        <div className="form_wrapper">
          <h1 className="form_title">{`${Localization.title}`}</h1>
          <p className="subtitle mb-8">{recovery}</p>

          <div className="input_wrapper">
            <VerificationInput />

            {min > 0 ? <p className="mt-4 error">{error}</p> : ""}

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
                  <p className="action" onClick={resendCode}>
                    {Localization.resend}
                  </p>
                </>
              )}
            </div>

            <div className="flex mt-4">
              {location.state.method === "email" ? (
                <p className="info mr-1">{Localization.not_your_email}</p>
              ) : (
                <p className="info mr-1">{Localization.not_your_number}</p>
              )}

              <p className="action" onClick={pre}>
                {Localization.change}
              </p>
            </div>

            <div className="flex mt-4 justify-between ...">
              <button className="pre" onClick={pre}>
                {Localization.previous}
              </button>
              <button className="verify" onClick={verifyCode}>
                {Localization.verify}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ languageReducer, otpReducer }) => ({
  languageReducer,
  otpReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
