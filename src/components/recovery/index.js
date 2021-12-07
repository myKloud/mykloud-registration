import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../common/input";
import Validation from "../common/validation";

import { isValidPhoneNumber } from "react-phone-number-input";
import "./style.scss";

const Recovery = () => {
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
      required: "Please enter valid email address",
      redundant:
        "Please enter secondary email address, that is not myKloud email",
    },
    number: {
      name: "number",
      required: "Please enter valid phone number or change the country code",
    },
  };

  const nextPage = () => {
    const is_valid = validateHandler();

    if (is_valid) {
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

    return is_valid_email && is_valid_number;
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
          <h1 className="form_title mb-1">
            Welcome, Monica! <span>👋</span>
          </h1>
          <p className="form_subtitle mb-8 text-center">
            Your myKloud account has been created succesfully.
          </p>
          <div className="form_sub_content">
            <p className="form_sub_title">
              For now , let’s select your recovery method
            </p>

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

                <p className="text">Email address</p>
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

                <p className="text">Phone number</p>
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
                    placeholder="Recovery email address"
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
                ? "You’ll recieve an email with a confirmation code"
                : "You’ll recieve an sms with a cofnirmation code"}
            </p>

            <button className="next_btn" onClick={nextPage}>
              Send me code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
