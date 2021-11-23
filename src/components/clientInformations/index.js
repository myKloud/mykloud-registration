import React, { useState, useEffect } from "react";
import { css } from "./clientInformations.css";
import { MonthPicker } from "react-dropdown-date";
import img from "../../images/birthday-date.png";
import Recaptcha from "react-google-recaptcha";
import { useHistory, useLocation } from "react-router-dom";

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
      <div className="form">
        <h1 className="formTitle">Fill in some basic info</h1>

        <div className="userName1">
          <input
            type="text"
            placeholder="First name"
            className="nameField"
            onChange={(firstName) => setFirstName(firstName.target.value)}
          ></input>
        </div>

        <div className="lastName">
          <input
            type="text"
            placeholder="Last name"
            className="nameField"
            onChange={(lastName) => setLastName(lastName.target.value)}
          ></input>
        </div>

        <p className="Your-birthday">Your birthday</p>

        <div className="datePicker">
          <MonthPicker
            defaultValue={"Month"}
            className="select-months"
            caps
            required={true}
            disabled={false}
            onChange={(month) => {
              setMonth(month);
            }}
            id={month == "" || month == "Month" ? "defaultMonth" : "month"}
            name={"month"}
            classes={"classes"}
            optionClasses={"optionclasses"}
          />
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Year"
            onChange={(year) => setYear(year.target.value)}
          ></input>
        </div>

        <div className="note1">
          <img src={img} alt="birhtday image" className="image"></img>
          <p className="imageDiscription">
            Here goe a short sentence taht can goes on two lines describing why
            we asking for date of birth.
          </p>
        </div>

        <Recaptcha
          sitekey="6LfgMzcdAAAAADfqK0z6yvTZfqEz0ozhUucnf9PQ"
          onloadCallback={recaptchaLoaded()}
          verifyCallback={verifyCallback()}
          className="recaptcha"
        />

        <div className="buttonsContainer">
          <p className="pre" onClick={previous}>
            Previous
          </p>
          <button className="next" onClick={next}>
            Create my account
          </button>
        </div>

        <p className="terms">
          By clicking "create my account", you agree to the Terms and Privacy
          Policy
        </p>
      </div>
    </>
  );
};

export default ClientInformations;
