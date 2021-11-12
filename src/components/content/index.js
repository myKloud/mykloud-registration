import React, { useState } from "react";
import { css } from "./content.css";

const Content = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div className="content">
        <h1 className="formTitle">Create your myKloud account</h1>
        <p className="normalText">Single access to all myKloud applications.</p>
        <div className="userName">
          <input
            type="text"
            placeholder="Username"
            className="userField"
            onchange={(e) => setUser(e.value)}
          ></input>
          <p className="domain">@mykloud.io</p>
        </div>
        <p className="note">
          Only letters (a-z), numbers (0-9) and periods(.) are allowed
        </p>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            className="passwordField"
            onchange={(e) => setPassword(e.value)}
          />

          <button
            className="show"
            onClick={() => setShowPassword(!showPassword)}
          >
            <u style={{ color: "#1565d8" }}>Show</u>
          </button>
        </div>
        <div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="confirmPasswordField"
            onchange={(e) => setConfirmPassword(e.value)}
          />

          <button
            className="show"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <u style={{ color: "#1565d8" }}>Show</u>
          </button>
        </div>
        <button className="nextBtn">Next</button>
      </div>
    </>
  );
};

export default Content;
