import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../common/input";
import Validation from "../common/validation";
import { setUserObj } from "../../actions/userAction";
import Localization from "./localization";
import { setStorage } from "../../config/storage";

import { isValidPhoneNumber } from "react-phone-number-input";
import "./style.scss";

const Recovery = (props) => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");

  const history = useHistory();
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const form_validation = {
    email: {
      name: "email",
      required: Localization.validation.email.required,
      redundant: Localization.validation.email.redundant,
    },
    number: {
      name: "number",
      required: Localization.validation.number.required,
    },
  };

  const nextPage = () => {
    const is_valid = validateHandler();
    if (is_valid) {
      const user_obj = props.userReducer;
      user_obj.method = method;
      user_obj.recovery = method === "email" ? email : number;
      setUserObj(user_obj);
      setStorage("verification");

      history.push({
        pathname: "/verification",
      });
    }
  };

  const validate = (input, value) => {
    let is_valid = true;

    if (input.name === "email") {
      setEmailMessage("");

      if (!value.length) {
        setEmailMessage(input.required);
        is_valid = false;
      } else if (!validEmail.test(email)) {
        setEmailMessage(input.required);
        is_valid = false;
      } else if (email.slice(-10).toLowerCase() === "mykloud.io") {
        setEmailMessage(input.redundant);
        is_valid = false;
      }
    }

    if (input.name === "number") {
      setNumberMessage("");

      if (!value.length) {
        setNumberMessage(input.required);
        is_valid = false;
      } else if (!isValidPhoneNumber(`+${number}`)) {
        setNumberMessage(input.required);
        is_valid = false;
      }
    }

    return is_valid;
  };

  const validateHandler = () => {
    const is_valid_email = validate(form_validation.email, email);
    const is_valid_number = validate(form_validation.number, number);

    return is_valid_email || is_valid_number;
  };

  const handleSetMethod = (type) => {
    setNumberMessage("");
    setEmailMessage("");
    setMethod(type);
  };

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  return (
    <>
      <div className="form_container recovery_container">
        <div className="form_wrapper">
          <h1 className="form_title mb-8">
            {Localization.title}, {props.userReducer.firstname || "client"}!{" "}
            <span>👋</span>
          </h1>

          <div className="form_sub_content">
            <p className="form_sub_title">{Localization.select_recovery}</p>

            <div className="button_container mb-5">
              <div
                className={
                  method === "email"
                    ? "select_button mr-4 selected"
                    : "select_button mr-4"
                }
                onClick={() => {
                  handleSetMethod("email");
                }}
              >
                <div className={method === "email" ? "logo white_img" : "logo"}>
                  <img
                    src={method === "email" ? whiteEmailImg : blackEmailImg}
                    alt="email logo"
                  />
                </div>

                <p className="text">{Localization.email_address}</p>
              </div>

              <div
                className={
                  method === "email"
                    ? "select_button"
                    : "select_button selected"
                }
                onClick={() => {
                  handleSetMethod("phone");
                }}
              >
                <div className={method === "email" ? "logo" : "logo white_img"}>
                  <img
                    src={method === "email" ? blackPhoneImg : whitePhoneImg}
                    alt="phone"
                  />
                </div>

                <p className="text">{Localization.phone_number}</p>
              </div>
            </div>

            {method === "email" ? (
              <>
                <div className="user_name mb-2">
                  <Input
                    type="text"
                    autoFocus={true}
                    value={email}
                    onChange={(e) => {
                      setEmail(e);
                      // validate(form_validation.email, e);
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
                      autoFocus: true,
                    }}
                    inputClass={`phone_input ${numberMessage && "validation"}`}
                    buttonClass={`country_dropdown ${
                      numberMessage && "validation"
                    }`}
                    value={number}
                    onChange={(e) => {
                      setNumber(e);
                      // validate(form_validation.number, e);
                    }}
                    country={"us"}
                  />

                  {numberMessage && <Validation error={numberMessage} />}
                </div>
              </>
            )}

            <p className="note mb-8">
              {method === "email"
                ? Localization.email_msg
                : Localization.sms_msg}
            </p>

            <button className="next_btn" onClick={nextPage}>
              {Localization.send_code}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ languageReducer, userReducer }) => ({
  languageReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);
