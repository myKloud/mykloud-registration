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
    history.push({
      pathname: "/info",
      state: { user: user, password: password },
    });
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
                autofocus="true"
                value={user}
                onChange={setUser}
                placeholder="username"
              />
              <span className="domain">@mykloud.io</span>
            </div>
            <p className="note mt-1">
              Only letters (a-z), numbers (0-9) and periods(.) are allowed
            </p>
          </div>
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
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
          </div>
          <div className="mb-4 relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={setPassword}
              className="extra-padding"
              placeholder="Confirm password"
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
