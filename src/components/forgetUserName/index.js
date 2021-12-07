import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import blackEmailImg from "../../images/email1.png";
import whiteEmailImg from "../../images/email2.png";
import blackPhoneImg from "../../images/phone1.png";
import whitePhoneImg from "../../images/phone2.png";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../common/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "./style.scss";

const ForgetUserName = () => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [submit, setSubmit] = useState(false);
  const history = useHistory();
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const next = () => {
    setSubmit(true);
    // if (
    //   (isValidPhoneNumber(`+${number}`) && method !== "email") ||
    //   (validEmail.test(email) &&
    //     method === "email" &&
    //     !(email.slice(-10).toLowerCase() === "mykloud.io"))
    // )
    history.push({
      pathname: "/verification",
    });
  };

  return (
    <>
      <div className="form_container forget_user_form">
        <div className="form_wrapper">
          <h1 className="form_title mb-7 ">Forgot username</h1>
          <p className="form_subtitle mb-7 text-center">
            Enter your recovery email or phone number
          </p>

          <div className="user_name">
            <Input
              type="text"
              autoFocus={true}
              value={email}
              onChange={setEmail}
              className="recovery_input mb-7"
              placeholder="Recovery email address or phone number "
            />
          </div>

          {/* {!isValidPhoneNumber(`+${number}`) && method !== "email" && submit ? (
            <>
              <div className="error mb-2">
                <p>
                  Please enter valid phone number or change the country code
                </p>
              </div>
            </>
          ) : (
            ""
          )}

          {!validEmail.test(email) && method === "email" && submit ? (
            <>
              <div className="error mb-2">
                <p>Please enter valid email address ”name@</p>
              </div>
            </>
          ) : (
            ""
          )}

          {validEmail.test(email) &&
          email.slice(-10).toLowerCase() === "mykloud.io" &&
          method === "email" &&
          submit ? (
            <>
              <div className="error mb-2">
                <p>
                  Please enter secondary email address, that is not myKloud
                  email
                </p>
              </div>
            </>
          ) : (
            ""
          )} */}

          <button className="next_btn" onClick={next}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgetUserName;
