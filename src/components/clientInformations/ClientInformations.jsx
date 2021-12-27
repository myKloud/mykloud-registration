import Input from "../common/input";
import Validation from "../common/validation";
import MonthPickerWrapper from "../common/monthPickerWrapper";
import img from "../../assets/images/birthday-date.png";
import previous from "./previous";
import nextPage from "./nextPage";
import validate from "./validate";
import dobValidation from "./dobValidation";
import "./ClientInformations.scss";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Recaptcha from "react-google-recaptcha";
import { useHistory, useLocation } from "react-router-dom";
import { setUserObj } from "../../actions/userAction";
import Localization from "./localization";
import { setStorage } from "../../shared/storage";

const ClientInformations = (props) => {
  const location = useLocation();
  const history = useHistory();
  const userObj = props.userReducer;
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
  const formValidation = {
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
    birthDay: {
      required: Localization.validation.birthDay.required,
      notValid: Localization.validation.birthDay.notValid,
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

  const validateHandler = () => {
    const isValidFirstname = validate(
      formValidation.firstName,
      firstName,
      setNameMessage,
      setFirstNameMessage,
      setLastNameMessage,
      setDateOfBirthMessage,
      setMonthMessage,
      firstName,
      lastName,
      setYearMessage,
      formValidation
    );
    const isValidLastname = validate(
      formValidation.lastName,
      lastName,
      setNameMessage,
      setFirstNameMessage,
      setLastNameMessage,
      setDateOfBirthMessage,
      setMonthMessage,
      firstName,
      lastName,
      setYearMessage,
      formValidation
    );
    const isValidMonth = validate(
      formValidation.month,
      month,
      setNameMessage,
      setFirstNameMessage,
      setLastNameMessage,
      setDateOfBirthMessage,
      setMonthMessage,
      firstName,
      lastName,
      setYearMessage,
      formValidation
    );
    const isValidDateOfBirth = validate(
      formValidation.year,
      year,
      setNameMessage,
      setFirstNameMessage,
      setLastNameMessage,
      setDateOfBirthMessage,
      setMonthMessage,
      firstName,
      lastName,
      setYearMessage,
      formValidation
    );

    const isValidYear = validYear(year);
    if (!isValidYear) handleYearDigits(year);
    if (!isVerifiedRobot) setCaptchaMessage(formValidation.captcha.required);

    return (
      isValidFirstname &&
      isValidLastname &&
      isValidMonth &&
      isValidDateOfBirth &&
      isValidYear &&
      isVerifiedRobot
    );
  };

  const handleYearDigits = (value) => {
    setDateOfBirthMessage("");
    setYearMessage("");

    if (!validYear(value)) {
      setYearMessage(formValidation.year.format);
      setDateOfBirthMessage(formValidation.year.format);
    }
  };

  const validYear = (value) => {
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
          <p className="normal_text mb-5">{userObj.username + userObj.mail}</p>
          <div className="input_wrapper">
            <div className="wrapper mb-4">
              <div className="name_container">
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e);
                    validate(
                      formValidation.firstName,
                      e,
                      setNameMessage,
                      setFirstNameMessage,
                      setLastNameMessage,
                      setDateOfBirthMessage,
                      setMonthMessage,
                      firstName,
                      lastName,
                      setYearMessage,
                      formValidation
                    );
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
                    validate(
                      formValidation.lastName,
                      e,
                      setNameMessage,
                      setFirstNameMessage,
                      setLastNameMessage,
                      setDateOfBirthMessage,
                      setMonthMessage,
                      firstName,
                      lastName,
                      setYearMessage,
                      formValidation
                    );
                  }}
                  placeholder={Localization.lastname_placeholder}
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
                    validate(
                      formValidation.month,
                      e,
                      setNameMessage,
                      setFirstNameMessage,
                      setLastNameMessage,
                      setDateOfBirthMessage,
                      setMonthMessage,
                      firstName,
                      lastName,
                      setYearMessage,
                      formValidation
                    );
                  }}
                  containerClassName="mr-4"
                  className={`${monthMessage && "validation"}`}
                />

                <Input
                  type="number"
                  value={year}
                  onChange={(e) => {
                    setYear(e);
                    validate(
                      formValidation.year,
                      e,
                      setNameMessage,
                      setFirstNameMessage,
                      setLastNameMessage,
                      setDateOfBirthMessage,
                      setMonthMessage,
                      firstName,
                      lastName,
                      setYearMessage,
                      formValidation
                    );
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
              <p
                className="pre"
                onClick={() => previous(setStorage, history, location)}
              >
                {Localization.previous}
              </p>
              <button
                className="next"
                onClick={() =>
                  nextPage(
                    validateHandler,
                    dobValidation,
                    userObj,
                    setUserObj,
                    setStorage,
                    history,
                    firstName,
                    lastName,
                    month,
                    year,
                    formValidation
                  )
                }
              >
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