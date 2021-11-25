import React, { useState } from "react";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.scss";

const Recovery = () => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
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
            {method === "email" ? (
              <>
                <div className="button_container mb-5">
                  <div
                    className="select_button mr-4 selected"
                    onClick={() => {
                      setMethod("email");
                    }}
                  >
                    <div className="logo white_img">
                      <img src={whiteEmailImg} alt="email logo" />
                    </div>

                    <p className="text">Email address</p>
                  </div>

                  <div
                    className="select_button"
                    onClick={() => {
                      setMethod("phone");
                    }}
                  >
                    <div className="logo">
                      <img src={blackPhoneImg} alt="phone" />
                    </div>

                    <p className="text">Phone number</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={email}
                  placeholder="Recovery email address"
                  className="recovery_input mb-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="note mb-8">
                  You’ll recieve an email with a cofnirmation code
                </p>
              </>
            ) : (
              <>
                <div className="button_container mb-5">
                  <div
                    className="select_button mr-4"
                    onClick={() => {
                      setMethod("email");
                    }}
                  >
                    <div className="logo">
                      <img src={blackEmailImg} alt="email logo" />
                    </div>
                    <p className="text">Email address</p>
                  </div>

                  <div
                    className="select_button selected"
                    onClick={() => {
                      setMethod("phone");
                    }}
                  >
                    <div className="logo white_img">
                      <img src={whitePhoneImg} alt="phone logo" />
                    </div>

                    <p className="text">Phone number</p>
                  </div>
                </div>
                <ReactPhoneInput
                  inputExtraProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  inputClass="phone_input"
                  containerClass="mb-2 dd"
                  value={number}
                  onChange={(e) => {
                    setNumber(e);
                    console.log(number);
                  }}
                  country={"us"}
                />
                <p className="note mb-8">
                  You’ll recieve an sms with a cofnirmation code
                </p>
              </>
            )}

            <button className="next_btn">Send me code</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
