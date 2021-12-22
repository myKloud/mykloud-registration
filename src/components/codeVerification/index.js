import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import VerificationInput from "../common/verificationInput";
import { useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import Localization from "./localization";
import {
  removeStorage,
  setStorage,
  setResend,
  getResend,
  removeResend,
} from "../../config/storage";
import { sendOtp, signUp } from "../../services/register";

const CodeVerification = (props) => {
  const location = useLocation();
  const [times, setTimes] = useState(1);
  const user_obj = props.userReducer;
  const recovery = props.recovery || user_obj.recovery || "01012345678";
  const [seconds, setSeconds] = useState(59);
  const [min, setMin] = useState(0);
  const [code, setCode] = useState("");
  const form_validation = {
    resend: {
      name: "resend",
      wait: Localization.validation.resend.wait,
    },
    codeVerify: {
      name: "codeVerify",
      error: Localization.validation.codeVerify.error,
    },
  };
  const [error, setError] = useState("");

  const otp = props.otpReducer;

  const signup = async () => {
    const x = await signUp({
      username: user_obj.username + user_obj.mail,
      firstName: user_obj.firstname,
      lastName: user_obj.lastname,
      password: user_obj.password,
      recovery: user_obj.recovery,
    });
    return x;
  };

  const resendCode = () => {
    sendOtp({
      value: location.state.value,
      otp: otp.otp,
    });

    setTimes(() => times + 1);
    setMin(0);
    setSeconds(59);
  };

  useEffect(() => {
    if (getResend()) {
      if (getResend() === "third") {
        setMin(14);
        setTimes(() => 3);
        setError(() => form_validation.resend.wait);
      } else if (getResend() === "second") {
        setTimes(() => 3);
      } else if (getResend() === "first") {
        setTimes(() => 2);
      }
    } else {
      setResend("first");
    }

    if (seconds > 0) {
      setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    // return () => clearInterval(interval);
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang, user_obj.recovery]);

  useEffect(() => {
    if (times === 2) {
      setResend("second");
    }

    if (times >= 3) {
      setResend("third");
      setMin(14);
      setError(() => form_validation.resend.wait);
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

    // TODO
    if (`${otp.otp}` === code) {
      setStorage("welcome");
      setError("");
      signup()
        .then((res) => {
          console.log(res);
          history.push({
            pathname: "/welcome",
          });
        })
        .catch((err) => {
          console.log("err");
        });
    } else {
      setError(() => form_validation.codeVerify.error);
    }
  };

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
                  <p className="action" onClick={resendCode}>
                    {Localization.resend}
                  </p>
                </>
              )}
            </div>

            <div className="flex mt-4">
              {user_obj.method === "email" ? (
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

const mapStateToProps = ({ languageReducer, userReducer, otpReducer }) => ({
  languageReducer,
  userReducer,
  otpReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
