import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import nextPage from "./nextPage";
import validate from "./validate";
import formValidation from "./formValidation";
import Input from "../common/input";
import Validation from "../common/validation";
import Localization from "./localization";
import {getResend } from "../../shared/storage";
import blackEmailImg from "../../assets/images/email1.png";
import whiteEmailImg from "../../assets/images/email2.png";
import blackPhoneImg from "../../assets/images/phone1.png";
import whitePhoneImg from "../../assets/images/phone2.png";
import "./Recovery.scss";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

let interval;
const Recovery = (props) => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const userObj = props.userReducer;
  const [method, setMethod] = useState(userObj.method);
  const [seconds, setSeconds] = useState(0);
  const [min, setMin] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const history = useHistory();
  let reduxMin = userObj.min;
  let reduxSeconds = userObj.seconds;

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  useEffect(() => {
    const resendStorage = getResend();
    if (reduxMin !== 0) {
      setMin(reduxMin);
    }

    if (reduxSeconds > 0) {
      setSeconds(reduxSeconds);
    }
    if (location.state && reduxMin === 0 && reduxSeconds === 0) {
      let locationMin = location.state.min;
      let locationSeconds = location.state.seconds;
      if (locationSeconds > 0) {
        setSeconds(locationSeconds);
      }
      if (locationMin !== 0) {
        setMin(locationMin);
      }
    } else {
      if (resendStorage === "third" && reduxMin === 0 && reduxSeconds === 0) {
        setMin(15);
        setSeconds(0);
      }
    }

    interval = setInterval(() => {
      setIsTimer(true);
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (seconds < 0 && min > 0) {
      setMin((min) => min - 1);
      setSeconds(59);
    }
    if (seconds === 0 && min === 0 && isTimer) {
      clearInterval(interval);
    }
  }, [seconds, min]);

  useEffect(() => {
    userObj.min = min;
  }, [min]);

  useEffect(() => {
    if (seconds >= 0) {
      userObj.seconds = seconds;
    }
  }, [seconds]);

  const validateHandler = () => {
    const isValidEmail = validate(formValidation.email, email ,
        setEmailMessage,
        setNumberMessage);
    const isValidNumber = validate(formValidation.number, number ,
        setEmailMessage,
        setNumberMessage);

    return isValidEmail || isValidNumber;
  };

  const handleSetMethod = (type) => {
    setNumberMessage("");
    setEmailMessage("");
    setMethod(type);
  };

  return (
    <>
      <div className="form_container recovery_container">
        <div className="form_wrapper">
          <h1 className="form_title mb-8">
            {Localization.title}, {props.userReducer.firstname || "client"}!{" "}
          </h1>

          <div className="form_sub_content">
            <p className="form_sub_title">{Localization.select_recovery}</p>

            <div className="button_container mb-7">
              <div
                className={
                  method !== "phone"
                    ? "select_button mr-4 selected"
                    : "select_button mr-4"
                }
                onClick={() => {
                  handleSetMethod("email");
                }}
              >
                <div className="logo">
                  <img
                    src={method !== "phone" ? whiteEmailImg : blackEmailImg}
                    alt="email logo"
                    className="image"
                  />
                </div>

                <p className="text">{Localization.email_address}</p>
              </div>

              <div
                className={
                  method !== "phone"
                    ? "select_button"
                    : "select_button selected"
                }
                onClick={() => {
                  handleSetMethod("phone");
                }}
              >
                <div className="logo">
                  <img
                    src={method === "email" ? blackPhoneImg : whitePhoneImg}
                    alt="phone"
                    className="image"
                  />
                </div>

                <p className="text">{Localization.phone_number}</p>
              </div>
            </div>

            {method !== "phone" ? (
              <>
                <div className="user_name mb-2">
                  <Input
                    type="text"
                    autoFocus={true}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.toLowerCase());
                    }}
                    className={`recovery_input ${emailMessage && "validation"}`}
                    placeholder={Localization.email_placeholder}
                  />
                  {emailMessage && <Validation error={emailMessage} />}
                </div>
              </>
            ) : (
              <>
                <div className="wrapper mb-2">
                  <ReactPhoneInput
                    inputExtraProps={{
                      name: "phone",
                      required: true,
                    }}
                    inputComponent={{
                      autofocus: true,
                    }}
                    inputClass={`phone_input ${numberMessage && "validation"}`}
                    buttonClass={`country_dropdown ${
                      numberMessage && "validation"
                    }`}
                    autoFocus={true}
                    value={number}
                    onChange={(e) => {
                      setNumber(e);
                    }}
                    country={"us"}
                  />

                  {numberMessage && <Validation error={numberMessage} />}
                </div>
              </>
            )}

            {method !== "phone" && !emailMessage ? (
              <p className="note mb-8">{Localization.email_msg}</p>
            ) : (
              ""
            )}
            {method === "phone" && !numberMessage ? (
              <p className="note mb-8">{Localization.sms_msg}</p>
            ) : (
              ""
            )}

            {min > 0 || (min === 0 && seconds > 0) ? (
              <>
                <button className="timer">
                  Wait for {min < 10 ? `0${min}` : min}:
                  {seconds < 10 ? `0${seconds}` : seconds} min to Send the Code
                </button>
              </>
            ) : (
              <button className="next_btn" onClick={() => nextPage(validateHandler, userObj , method , email , number , props, history)}>
                {Localization.send_code}
              </button>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);
