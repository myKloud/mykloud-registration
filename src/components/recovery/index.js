import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../common/input";
import "./style.scss";

const Recovery = () => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const history = useHistory();
  const next = () => {
    history.push({
      pathname: "/verification",
    });
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
                  setMethod("email");
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
                  setMethod("phone");
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
                <div className="user_name">
                  <Input
                    type="text"
                    autofocus={true}
                    value={email}
                    onChange={setEmail}
                    className="recovery_input mb-2"
                    placeholder="Recovery email address"
                  />
                </div>
              </>
            ) : (
              <>
                <ReactPhoneInput
                  inputExtraProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  inputClass="phone_input"
                  containerClass="mb-2"
                  buttonClass="country_dropdown"
                  value={number}
                  onChange={(e) => {
                    setNumber(e);
                    console.log(number);
                  }}
                  country={"us"}
                />
              </>
            )}

            <p className="note mb-8">
              {method === "email"
                ? "You’ll recieve an email with a cofnirmation code"
                : "You’ll recieve an sms with a cofnirmation code"}
            </p>

            <button className="next_btn" onClick={next}>
              Send me code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
