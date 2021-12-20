import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import img from "../../images/birthday-date.png";
import Recaptcha from "react-google-recaptcha";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../common/input";
import Validation from "../common/validation";
import { setUserObj } from "../../actions/userAction";
import Localization from "./localization";
import { setStorage } from "../../config/storage";

import MonthPickerWrapper from "../common/monthPickerWrapper";

import "./style.scss";

const ClientInformations = (props) => {
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
      required: Localization.validation.firstName.required,
    },
    lastName: {
      name: "lastName",
      required: Localization.validation.lastName.required,
    },
    name: {
      requiredBoth: Localization.validation.name.requiredBoth,
    },
    month: {
      name: "month",
    },
    year: {
      name: "year",
      format: Localization.validation.year.format,
    },
    bithday: {
      required: Localization.validation.bithday.required,
      notValid: Localization.validation.bithday.notValid,
      minimum: 13,
    },
    captcha: {
      required: Localization.validation.captcha.required,
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
    setStorage("register");
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
        const user_obj = props.userReducer;
        user_obj.firstname = firstName;
        user_obj.lastname = lastName;
        user_obj.month = month;
        user_obj.year = year;

        setUserObj(user_obj);
        setStorage("recovery");

        history.push({
          pathname: "/recovery",
        });
      } else {
        setStorage("dob");
        history.push({
          pathname: "/dob",
        });
      }
    }
  };
  const user_obj = props.userReducer;

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
    const current_date = new Date();
    const date = current_date.getDate();
    const hour = current_date.getHours();
    const minutes = current_date.getMinutes();
    const seconds = current_date.getSeconds();
    const miliseonds = current_date.getMilliseconds();

    const dob_date = new Date(
      year,
      month,
      date,
      hour,
      minutes,
      seconds,
      miliseonds
    );

    const diff = current_date.getTime() - dob_date.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    let is_valid = true;
    if (age <= form_validation.bithday.minimum) {
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

  useEffect(() => {
    const lang = props.languageReducer.lang;
    Localization.setLanguage(lang);
  }, [props.languageReducer.lang]);

  return (
    <>
      <div className="form_container client_container">
        <div className="form_wrapper">
          <h1 className="form_title">{Localization.title}</h1>
          <p className="normal_text mb-5">
            {user_obj.username + user_obj.mail}
          </p>
          <div className="input_wrapper">
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
                  placeholder={Localization.firstname_placeholder}
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
                  placeholder={Localization.lastname_placeholder}
                  // containerClassName="mb-4"
                  className={`${lastNameMessage && "validation"}`}
                />
              </div>
              {nameMessage && <Validation error={nameMessage} />}
            </div>

            <p className="form_sub_title">{Localization.birthday_title}</p>
            <div className="wrapper mb-4">
              <div className="datePicker">
                <MonthPickerWrapper
                  value={month}
                  placeholder={Localization.month_placeholder}
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
                  placeholder={Localization.year_placeholder}
                />
              </div>

              {dateOfBirthMessage && <Validation error={dateOfBirthMessage} />}
            </div>

            <div className="note mb-4">
              <img src={img} alt="birhtday" className="mr-3" />
              <p className="image_description">{Localization.msg}</p>
            </div>

            <div className="wrapper mb-4">
              <Recaptcha
                sitekey={process.env.REACT_APP_SITE_KEY}
                onChange={verifyCallback}
                data-size="compact"
              />
              {captchaMessage && <Validation error={captchaMessage} />}
            </div>

            <div className="buttons_container mb-4">
              <p className="pre" onClick={previous}>
                {Localization.previous}
              </p>
              <button className="next" onClick={nextPage}>
                {Localization.create_account}
              </button>
            </div>
            <p className="terms">
              {Localization.agree}
              <u className="mx-1">{Localization.terms}</u>
              {Localization.and}
              <u className="mx-1">{Localization.privacy_policy}</u>
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientInformations);
