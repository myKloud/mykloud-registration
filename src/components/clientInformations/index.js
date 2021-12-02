import React, { useState } from "react";
import img from "../../images/birthday-date.png";
import Recaptcha from "react-google-recaptcha";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../common/input";
import MonthPickerWrapper from "../common/monthPickerWrapper";

import "./style.scss";

const ClientInformations = () => {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [submit, setSubmit] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const [checkBirth, setCheckBirth] = useState(false);
  const [isVerifiedRobot, setIsVerifiedRobot] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorBirth, setErrorBirth] = useState("");

  const verifyCallback = (response) => {
    if (response) {
      setIsVerifiedRobot(true);
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

  const next = () => {
    setSubmit(true);
    if (checkName && checkBirth && isVerifiedRobot) {
      history.push({
        pathname: "/recovery",
      });
    }
  };

  return (
    <>
      <div className="form_container client_container">
        <div className="form_wrapper">
          <h1 className="form_title mb-10">Fill in some basic info</h1>
          <div className="name_container">
            <Input
              type="text"
              value={firstName}
              onChange={setFirstName}
              autoFocus={true}
              placeholder="First name"
              containerClassName="mb-4 first_name"
              check={setCheckName}
              submitClientInfo={submit}
              firstName={firstName}
              lastName={lastName}
              error={setErrorName}
              message={{
                name: "name",
                requiredFirst: "Enter first names",
                requiredLast: "Enter last name name",
                requiredBoth: "Enter first and last names",
              }}
            />

            <Input
              type="text"
              value={lastName}
              onChange={setLastName}
              placeholder="Last name"
              containerClassName="mb-4"
            />
          </div>

          {!checkName ? (
            <div className="error mb-3">
              <p>{errorName}</p>{" "}
            </div>
          ) : (
            ""
          )}

          <p className="form_sub_title">Your birthday</p>
          <div className="datePicker mb-4">
            <MonthPickerWrapper
              value={month}
              placeholder="Month"
              required={true}
              disabled={false}
              onChange={setMonth}
              containerClassName="mr-4"
            />

            <Input
              type="number"
              value={year}
              onChange={setYear}
              placeholder="Year"
              check={setCheckBirth}
              submitClientInfo={submit}
              month={month}
              year={year}
              error={setErrorBirth}
              message={{
                name: "birth",
                required: "Enter your Date of Birth",
              }}
            />
          </div>

          {!checkBirth ? (
            <div className="error mb-3">
              <p>{errorBirth}</p>{" "}
            </div>
          ) : (
            ""
          )}

          <div className="note mb-4">
            <img src={img} alt="birhtday" className="mr-3" />
            <p className="image_description">
              Here goe a short sentence taht can goes on two lines describing
              why we asking for date of birth.
            </p>
          </div>

          <Recaptcha
            sitekey="6Ld94lYdAAAAAD2oJ3xOQFzAQb0QNSM_t70ypxHx"
            onChange={verifyCallback}
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
