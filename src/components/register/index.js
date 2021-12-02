import React, { useState, useEffect } from "react";
import icon from "../../images/lock 1.svg";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../common/input";
import "./style.scss";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const [checkConfirmPass, setCheckConfirmPass] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setUser(location.state.backUser);
      setPassword(location.state.backPassword);
      setConfirmPassword(location.state.backPassword);
    }
  }, [location]);

  const nextPage = () => {
    setSubmit(true);
    if (checkUser && checkPass && checkConfirmPass) {
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
                onChange={setUser}
                placeholder="Username"
                check={setCheckUser}
                submitRegister={submit}
                message={{
                  name: "username",
                  required: "Choose a myKmail address",
                  length:
                    "Your username must be between 4 and 30 characters long",
                  pattern:
                    "Sorry, only letters (a-z), numbers (0-9) and periods (.) are allowed.",
                }}
              />
              <span className="domain">@mykloud.io</span>
            </div>
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
              onChange={setPassword}
              className="extra-padding"
              placeholder="Create password"
              check={setCheckPass}
              submitRegister={submit}
              message={{
                name: "password",
                required: "Enter password",
                length:
                  "Use 8 or more characters with a mix of letters, numbers & symbols",
                pattern:
                  "Use 8 or more characters with a mix of letters, numbers & symbols",
              }}
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
          </div>
          <div className=" relative ">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
              className="extra-padding1"
              placeholder="Confirm password"
              check={setCheckConfirmPass}
              submitRegister={submit}
              password={password}
              confirmPassword={confirmPassword}
              message={{
                name: "confirmPassword",
                required: "Confirm your password",
                match: "Those passwords didn’t match. Try again.",
              }}
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
