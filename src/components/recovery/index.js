import React, { useState } from "react";
import { css } from "./recovery.css";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Recovery = () => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  return (
    <>
      <div className="recoveryForm">
        <div className="title">
          <p className="recoveryFormTitle">Welcome, Monica!</p>
          <p>👋</p>
        </div>
        <p className="recoveryFormSubtitle">
          Your myKloud account has been created succesfully.
        </p>

        <p className="recoveryFormSubtitle2">
          For now , let’s select your recovery method
        </p>

        {method == "email" ? (
          <div className="buttonContainer">
            <div
              className="email"
              style={{
                boxShadow: "0 4px 14px 1px rgba(27, 115, 209, 0.12)",
                backgroundColor: "#f5f9ff",
                border: "solid 1px #1b73d1",
              }}
              onClick={() => {
                setMethod("email");
              }}
            >
              <div
                className="imgBorder"
                style={{
                  backgroundColor: "#1b73d1",
                  border: "solid 2px #1b73d1",
                }}
              >
                <img src={whiteEmailImg}></img>
              </div>

              <p className="text" style={{ color: "#1b73d1" }}>
                Email address
              </p>
            </div>

            <div
              className="phone"
              style={{
                boxShadow: "0 4px 14px 1px rgba(0, 0, 0, 0.06)",
                backgroundColor: "white",
              }}
              onClick={() => {
                setMethod("phone");
              }}
            >
              <div className="imgBorder" style={{ border: "solid 2px" }}>
                <img src={blackPhoneImg}></img>
              </div>

              <p className="text">Phone number</p>
            </div>
          </div>
        ) : (
          <div className="buttonContainer">
            <div
              className="email"
              style={{
                boxShadow: "0 4px 14px 1px rgba(0, 0, 0, 0.06)",
                backgroundColor: "white",
              }}
              onClick={() => {
                setMethod("email");
              }}
            >
              <div className="imgBorder" style={{ border: "solid 2px" }}>
                <img src={blackEmailImg}></img>
              </div>
              <p className="text">Email address</p>{" "}
            </div>

            <div
              className="phone"
              style={{
                boxShadow: "0 4px 14px 1px rgba(27, 115, 209, 0.12)",
                backgroundColor: "#f5f9ff",
                border: "solid 1px #1b73d1",
              }}
              onClick={() => {
                setMethod("phone");
              }}
            >
              <div
                className="imgBorder"
                style={{
                  backgroundColor: "#1b73d1",
                  border: "solid 2px #1b73d1",
                }}
              >
                <img src={whitePhoneImg}></img>
              </div>

              <p className="text" style={{ color: "#1b73d1" }}>
                Phone number
              </p>
            </div>
          </div>
        )}

        {method == "email" ? (
          <input
            type="text"
            placeholder="Recovery email address"
            className="recoveryInput"
            onchange={(e) => setEmail(e.value)}
          ></input>
        ) : (
          <ReactPhoneInput
            inputExtraProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            value={number}
            onChange={(e) => {
              setNumber(e);
              console.log(number);
            }}
            style={{
              marginLeft: "5.7638888888888888vw",
              marginTop: "1.953125vh",
            }}
            inputStyle={{
              width: "32.086111111111111111111111111111vw",
              height: "5.86875vh",
              borderRadius: "0.7vh",
              fontFamily: "Poppins",
              fontSize: "14px",
              border: "solid 1px #dcdce7",
              outline: "none",
              marginTop: "1.953125vh",
            }}
            country={"us"}
          />
        )}

        {method == "email" ? (
          <p className="endText">
            You’ll recieve an email with a cofnirmation code
          </p>
        ) : (
          <p className="endText">
            You’ll recieve an sms with a cofnirmation code
          </p>
        )}

        <button className="nextBtn1">Send me code</button>
      </div>
    </>
  );
};

export default Recovery;
