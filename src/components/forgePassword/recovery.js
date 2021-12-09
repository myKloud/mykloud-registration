import React, { useState } from "react";
import Input from "../common/input";
import "./style.scss";
import Verification from "../codeVerification";
import Reset from "./reset";
import { connect } from "react-redux";
import Localization from "./localization";

const Recovery = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  // const [submit, setSubmit] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState("recovery");

  const next = () => {
    setStage("verification");
  };

  const { lang } = props.languageReducer;
  Localization.setLanguage(lang);

  const recovery = () => {
    return (
      <div className="form_container forget_password_form">
        <div className="form_wrapper">
          <h1 className="form_title mb-7 ">{Localization.title}</h1>
          <p className="form_subtitle mb-7 text-center">
            {Localization.recovery_sub_title}
          </p>

          <Input
            type="text"
            autoFocus={true}
            value={email}
            onChange={setEmail}
            className="recovery_input mb-7"
            placeholder={Localization.recovery_placeholder}
          />

          <button className="next_btn" onClick={next}>
            {Localization.next}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {stage === "recovery" ? recovery() : ""}

      {stage === "verification" ? (
        <Verification resetPass={true} setStage={setStage} recovery={email} />
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

const mapStateToProps = ({ languageReducer }) => ({
  languageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);
