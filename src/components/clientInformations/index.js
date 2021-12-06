import React, { useState } from "react";
import img from "../../images/birthday-date.png";
import Recaptcha from "react-google-recaptcha";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../common/input";
import Validation from "../common/validation";

import MonthPickerWrapper from "../common/monthPickerWrapper";

import "./style.scss";

const ClientInformations = () => {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isVerifiedRobot, setIsVerifiedRobot] = useState(false);

  const [firstNameMessage, setFirstNameMessage] = useState("");
  const [lastNameMessage, setLastNameMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  const [monthMessage, setMonthMessage] = useState("");
  const [yearMessage, setYearMessage] = useState("");
  const [dateOfBirthMessage, setDateOfBirthMessage] = useState("");

  const [captchaMessage, setCaptchaMessage] = useState("");

  const form_validation = {
    firstName: {
      name: "firstName",
      required: "Enter first names",
    },
    lastName: {
      name: "lastName",
      required: "Enter last name",
    },
    name: {
      requiredBoth: "Enter first and last names",
    },
    month: {
      name: "month",
    },
    year: {
      name: "year",
      format: "Invalid year format",
    },
    bithday: {
      required: "Enter your Date of Birth",
      notValid: "sorry",
      minimum: 13,
    },
    captcha: {
      required: "Check the captcha",
    },
  };

  const verifyCallback = (response) => {
    if (response) {
      setIsVerifiedRobot(true);
      setCaptchaMessage("");
    }
  };

  const history = useHistory();

  const previous = () => {
    history.push({
      pathname: "/register",
      state: {
        backUser: location.state.user,
        backPassword: location.state.password,
      },
    });
  };

  const nextPage = () => {
    const is_valid = validateHandler();

    if (is_valid) {
      const is_valid_dob = dobValidation();
      if (is_valid_dob) {
        history.push({
          pathname: "/recovery",
        });
      } else {
        alert("redirect to dob page");
      }
    }
  };

  const validate = (input, value) => {
    let is_valid = true;

    if (input.name === "firstName") {
      setNameMessage("");
      setFirstNameMessage("");

      if (!value.length) {
        setFirstNameMessage(input.required);
        setNameMessage(input.required);

        if (!lastName.length) {
          setLastNameMessage(input.required);
          setNameMessage(form_validation.name.requiredBoth);
        }
        is_valid = false;
      }
    }

    if (input.name === "lastName") {
      setNameMessage("");
      setLastNameMessage("");

      if (!value.length) {
        setLastNameMessage(input.required);
        setNameMessage(input.required);

        if (!firstName.length) {
          setFirstNameMessage(input.required);
          setNameMessage(form_validation.name.requiredBoth);
        }
        is_valid = false;
      }
    }

    if (input.name === "month") {
      setDateOfBirthMessage("");
      setMonthMessage("");

      if (!value.length) {
        setMonthMessage(form_validation.bithday.required);
        setDateOfBirthMessage(form_validation.bithday.required);

        is_valid = false;
      }
    }

    if (input.name === "year") {
      setDateOfBirthMessage("");
      setYearMessage("");

      if (!value.length) {
        setYearMessage(form_validation.bithday.required);
        setDateOfBirthMessage(form_validation.bithday.required);

        is_valid = false;
      }
    }

    return is_valid;
  };

  const dobValidation = () => {
    let is_valid = true;

    const current_date = new Date();
    const current_year = current_date.getFullYear();
    // const current_month = current_date.getMonth() + 1;

    const year_differance = current_year - year;

    if (year_differance <= form_validation.bithday.minimum) {
      is_valid = false;
    }

    return is_valid;
  };

  const validateHandler = () => {
    const is_valid_firstname = validate(form_validation.firstName, firstName);
    const is_valid_lastname = validate(form_validation.lastName, lastName);
    const is_valid_month = validate(form_validation.month, month);
    const is_valid_date_of_birth = validate(form_validation.year, year);

    const is_valid_year = isValidYear(year);
    if (!is_valid_year) handleYearDigits(year);

    if (!isVerifiedRobot) setCaptchaMessage(form_validation.captcha.required);

    return (
      is_valid_firstname &&
      is_valid_lastname &&
      is_valid_month &&
      is_valid_date_of_birth &&
      is_valid_year &&
      isVerifiedRobot
    );
  };

  const handleYearDigits = (value) => {
    setDateOfBirthMessage("");
    setYearMessage("");

    if (!isValidYear(value)) {
      setYearMessage(form_validation.year.format);
      setDateOfBirthMessage(form_validation.year.format);
    }
  };

  const isValidYear = (value) => {
    if (value.length !== 4) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="form_container client_container">
        <div className="form_wrapper">
          <h1 className="form_title mb-10">Fill in some basic info</h1>
          <div className="wrapper mb-4">
            <div className="name_container">
              <Input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e);
                  validate(form_validation.firstName, e);
                }}
                autoFocus={true}
                placeholder="First name"
                containerClassName="first_name"
                className={`${firstNameMessage && "validation"}`}
              />

              <Input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e);
                  validate(form_validation.lastName, e);
                }}
                placeholder="Last name"
                // containerClassName="mb-4"
                className={`${lastNameMessage && "validation"}`}
              />
            </div>
            {nameMessage && <Validation error={nameMessage} />}
          </div>

          <p className="form_sub_title">Your birthday</p>
          <div className="wrapper mb-4">
            <div className="datePicker">
              <MonthPickerWrapper
                value={month}
                placeholder="Month"
                required={true}
                disabled={false}
                onChange={(e) => {
                  setMonth(e);
                  validate(form_validation.month, e);
                }}
                containerClassName="mr-4"
                className={`${monthMessage && "validation"}`}
              />

              <Input
                type="number"
                value={year}
                onChange={(e) => {
                  setYear(e);
                  validate(form_validation.month, e);
                }}
                onBlur={handleYearDigits}
                className={`${yearMessage && "validation"}`}
                placeholder="Year"
              />
            </div>

            {dateOfBirthMessage && <Validation error={dateOfBirthMessage} />}
          </div>

          <div className="note mb-4">
            <img src={img} alt="birhtday" className="mr-3" />
            <p className="image_description">
              Here goe a short sentence taht can goes on two lines describing
              why we asking for date of birth.
            </p>
          </div>

          <div className="wrapper mb-4">
            <Recaptcha
              sitekey="6Ld94lYdAAAAAD2oJ3xOQFzAQb0QNSM_t70ypxHx"
              onChange={verifyCallback}
              data-size="compact"
            />
            {captchaMessage && <Validation error={captchaMessage} />}
          </div>

          <div className="buttons_container mb-4">
            <p className="pre" onClick={previous}>
              Previous
            </p>
            <button className="next" onClick={nextPage}>
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
