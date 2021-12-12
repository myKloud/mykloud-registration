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
  const [seconds, setSeconds] = useState(5);
  const [data, setData] = useState("");

  const resendCode = () => {
    if (times < 3) {
      setTimes(() => times + 1);
    } else {
      removeResend();
      setTimes(() => 1);
      setFirstResend(recovery, "13");
    }

    setSeconds(5);
  };

  useEffect(() => {
    if (!getFirstResend()) {
      setFirstResend(recovery, "13");
    } else if (getFirstResend().recoveryData === location.state.value) {
      if (!getSecondResend()) {
        setTimes(() => 2);
      } else if (getSecondResend() && !getThirdResend()) {
        setTimes(() => 3);
      } else if (getThirdResend()) {
        setSeconds(24 - getFirstResend().date);
        setTimes(() => 4);
      }
    } else {
      setFirstResend(recovery, "13");
    }

    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (times === 2) {
      setSecondResend(recovery, "15");
    }

    if (times === 3) {
      setThirdResend(recovery, "18");
      setSeconds(24 - getFirstResend().date);
    }
  }, [times]);

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
  };

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
      <div className="form_container verification_container">
        <div className="form_wrapper">
          <h1 className="form_title">{`${Localization.title}`}</h1>
          <p className="subtitle mb-8">{recovery}</p>

          <div className="input_wrapper">
            <VerificationInput />

            <div className="flex mt-4">
              <p className="info mr-1">{Localization.not_recieve}</p>
              {seconds > 0 ? (
                <>
                  <p className="timer">
                    {seconds < 10
                      ? `Wait for 00:0${seconds} sec`
                      : `Wait for 00:${seconds} sec`}
                  </p>
                </>
              ) : (
                <p className="action" onClick={resendCode}>
                  {Localization.resend}
                </p>
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

const mapStateToProps = ({ languageReducer }) => ({
  languageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
