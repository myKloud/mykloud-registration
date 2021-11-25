import React, { useState } from "react";
import { MonthPicker } from "react-dropdown-date";
import img from "../../images/birthday-date.png";
import Recaptcha from "react-google-recaptcha";
import { useHistory, useLocation } from "react-router-dom";

import "./style.scss";

const ClientInformations = () => {
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const recaptchaLoaded = () => {
    console.log("capcha successfully loaded");
  };

  const verifyCallback = (response) => {
    if (response) {
      setIsVerified(true);
    }
  };

  const history = useHistory();

  const previous = () => {
    history.push({
      pathname: "/",
      state: {
        backUser: location.state.user,
        backPassword: location.state.password,
      },
    });
  };

  const next = () => {
    history.push({
      pathname: "/recovery",
    });
  };

  return (
    <>
      <div className="form_container">
        <div className="form_wrapper">
          <h1 className="form_title mb-10">Fill in some basic info</h1>
          <div className="name_container">
            <input
              type="text"
              placeholder="First name"
              className="form_field mb-4 first_name"
              onChange={(firstName) => setFirstName(firstName.target.value)}
            ></input>

            <input
              type="text"
              placeholder="Last name"
              className="form_field mb-4"
              onChange={(lastName) => setLastName(lastName.target.value)}
            ></input>
          </div>
          <p className="your_birthday">Your birthday</p>
          <div className="datePicker mb-4">
            <MonthPicker
              defaultValue={"Month"}
              classes={`select-months form_field mr-4 ${
                !month ? "placeholder" : ""
              }`}
              caps
              required={true}
              disabled={false}
              onChange={(month) => {
                setMonth(month);
              }}
              name={"month"}
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              className="form_field"
              onChange={(year) => setYear(year.target.value)}
            ></input>
          </div>
          <div className="note mb-4">
            <img src={img} alt="birhtday" className="mr-3" />
            <p className="image_description">
              Here goe a short sentence taht can goes on two lines describing
              why we asking for date of birth.
            </p>
          </div>

          <Recaptcha
            sitekey="6Ld94lYdAAAAAD2oJ3xOQFzAQb0QNSM_t70ypxHx"
            onloadCallback={recaptchaLoaded()}
            verifyCallback={verifyCallback()}
            className="mb-4"
            data-size="compact"
          />

          <div className="buttons_container mb-4">
            <p className="pre" onClick={previous}>
              Previous
            </p>
            <button className="next" onClick={next}>
              Create my account
            </button>
          </div>

          <p className="terms">
            By clicking "create my account", you agree to the
            <u className="mx-1">Terms</u>
            and
            <u className="mx-1">Privacy Policy</u>
          </p>
        </div>
      </div>
    </>
  );
};

export default ClientInformations;
