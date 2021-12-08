import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../common/input";
import "./style.scss";

const Reset = (props) => {
  const history = useHistory();

  const next = () => {
    history.push("/login");
  };

  return (
    <div className="form_container forget_password_form">
      <div className="form_wrapper">
        <h1 className="form_title mb-7 ">Set up new password</h1>
        <p
          className="form_subtitle mb-7 text-center"
          style={{ width: "385px", marginLeft: "45px" }}
        >
          Password should be 8 or more characters with a mix of letters, numbers
          and symbols
        </p>
        <div className=" relative ">
          <Input
            type={props.showPassword ? "text" : "password"}
            autoFocus={true}
            value={props.newPassword}
            onChange={props.setNewPassword}
            className="recovery_input mb-7"
            placeholder="Create new password"
          />

          <button
            className="input_visibilty"
            onClick={() => props.setShowPassword(!props.showPassword)}
          >
            {!props.showPassword ? (
              <u style={{ color: "#1565d8" }}>show</u>
            ) : (
              <u style={{ color: "#1565d8" }}>hide</u>
            )}
          </button>
        </div>

        <div className=" relative ">
          <Input
            type={props.showConfirmPassword ? "text" : "password"}
            value={props.confirmPassword}
            onChange={props.setConfirmPassword}
            className="recovery_input mb-7"
            placeholder="Confirm new password"
          />

          <button
            className="input_visibilty"
            onClick={() =>
              props.setShowConfirmPassword(!props.showConfirmPassword)
            }
          >
            {!props.showConfirmPassword ? (
              <u style={{ color: "#1565d8" }}>show</u>
            ) : (
              <u style={{ color: "#1565d8" }}>hide</u>
            )}
          </button>
        </div>

        <button className="next_btn" onClick={next}>
          Send me the code
        </button>
      </div>
    </div>
  );
};

export default Reset;
