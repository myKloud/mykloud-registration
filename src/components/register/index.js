import React, { useState, useEffect } from "react";
import icon from "../../images/lock 1.svg";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../common/input";
import Validation from "../common/validation";
import "./style.scss";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const [userMessage, setUserMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [passConfirmMessage, setPassConfirmMessage] = useState("");

  const history = useHistory();
  const location = useLocation();

  const form_validation = {
    username: {
      name: "username",
      required: "Choose a myKmail address",
      length: "Your username must be between 4 and 30 characters long",
      pattern:
        "Sorry, only letters (a-z), numbers (0-9) and periods (.) are allowed.",
    },

    password: {
      name: "password",
      required: "Enter password",
      length:
        "Use 8 or more characters with a mix of letters, numbers & symbols",
      pattern:
        "Use 8 or more characters with a mix of letters, numbers & symbols",
    },

    confirmPassword: {
      name: "confirmPassword",
      required: "Confirm your password",
      match: "Those passwords didn’t match. Try again.",
    },
  };

  useEffect(() => {
    if (location.state) {
      setUser(location.state.backUser);
      setPassword(location.state.backPassword);
      setConfirmPassword(location.state.backPassword);
    }
  }, [location]);

  const validate = (input, value) => {
    let is_valid = true;
    const validUser = new RegExp("^[a-z0-9.]+[a-z0-9]$");

    if (input.name === "username") {
      setUserMessage("");
      if (!value.length) {
        setUserMessage(input.required);
        is_valid = false;
      } else if (value.length < 4 || value.length > 30) {
        setUserMessage(input.length);
        is_valid = false;
      } else if (!validUser.test(value)) {
        setUserMessage(input.pattern);
        is_valid = false;
      }
    }

    if (input.name === "password") {
      setPassMessage("");
      if (!value.length) {
        setPassMessage(input.required);
        is_valid = false;
      } else if (value.length < 8) {
        setPassMessage(input.length);
        is_valid = false;
      }
    }
    if (input.name === "confirmPassword") {
      setPassConfirmMessage("");
      if (password !== value) {
        setPassConfirmMessage(input.match);
        is_valid = false;
      }
    }

    return is_valid;
  };

  const validateHandler = () => {
    const is_valid_username = validate(form_validation.username, user);
    const is_valid_password = validate(form_validation.password, password);
    const is_valid_confirm_password = validate(
      form_validation.confirmPassword,
      confirmPassword
    );

    return is_valid_username && is_valid_password && is_valid_confirm_password;
  };

  const nextPage = () => {
    setSubmit(true);
    const is_valid = validateHandler();

    if (is_valid) {
      history.push({
        pathname: "/info",
        state: { user: user, password: password },
      });
    }
  };

  return (
    <>
      <div className="form_container register_container">
        <div className="form_wrapper">
          <h1 className="form_title">Create your myKloud account</h1>
          <p className="normal_text mb-10">
            Single access to all myKloud applications.
          </p>

          <div className="mb-4">
            <div className="user_name">
              <Input
                type="text"
                autoFocus={true}
                value={user}
                onChange={(e) => {
                  setUser(e);
                  validate(form_validation.username, e);
                }}
                placeholder="Username"
                className={userMessage && "validation"}
              />
              <span className={`domain ${userMessage && "validation"}`}>
                @mykloud.io
              </span>
            </div>
            {userMessage && <Validation error={userMessage} />}
            {!submit ? (
              <p className="note mt-1">
                Only letters (a-z), numbers (0-9) and periods(.) are allowed
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e);
                validate(form_validation.password, e);
              }}
              className="extra-padding"
              placeholder="Create password"
            />

            <button
              className="input_visibilty"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <u style={{ color: "#1565d8" }}>Show</u>
              ) : (
                <u style={{ color: "#1565d8" }}>Hide</u>
              )}
            </button>

            {passMessage && <Validation error={passMessage} />}
          </div>
          <div className=" relative ">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e);
                validate(form_validation.confirmPassword, e);
              }}
              className="extra-padding"
              placeholder="Create password"
            />
            <button
              className="input_visibilty"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {!showConfirmPassword ? (
                <u style={{ color: "#1565d8" }}>Show</u>
              ) : (
                <u style={{ color: "#1565d8" }}>Hide</u>
              )}
            </button>
            {passConfirmMessage && <Validation error={passConfirmMessage} />}
          </div>
          <button className="next_btn mt-10" onClick={nextPage}>
            Next
          </button>
          <div className="safe_message mt-3">
            <img src={icon} alt="icon" />
            <p className="info ml-2">
              Safe & secure via myKloud blockhain technologies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
