import React, { useState } from "react";
import Input from "../common/input";
import "./style.scss";
import Verification from "../codeVerification";
import Reset from "./reset";

const Recovery = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState("recovery");

  const next = () => {
    setStage("verification");
  };

  const recovery = () => {
    return (
      <div className="form_container forget_password_form">
        <div className="form_wrapper">
          <h1 className="form_title mb-7 ">Forgot password</h1>
          <p className="form_subtitle mb-7 text-center">
            Enter your recovery email or phone number
          </p>

          <Input
            type="text"
            autoFocus={true}
            value={email}
            onChange={setEmail}
            className="recovery_input mb-7"
            placeholder="Recovery email address or phone number"
          />

          <button className="next_btn" onClick={next}>
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {stage === "recovery" ? recovery() : ""}

      {stage === "verification" ? (
        <Verification resetPass={true} setStage={setStage} />
      ) : (
        ""
      )}

      {stage === "reset" ? (
        <Reset
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          setStage={setStage}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Recovery;
