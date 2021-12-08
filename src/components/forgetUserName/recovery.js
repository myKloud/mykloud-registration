import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../common/input";
import "./style.scss";
import Fullname from "./fullname";
import Verification from "../codeVerification";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const history = useHistory();
  const [stage, setStage] = useState("recovery");

  const next = () => {
    setStage("fullname");
  };

  const recovery = () => {
    return (
      <div className="form_container forget_user_form">
        <div className="form_wrapper">
          <h1 className="form_title mb-7 ">Forgot username</h1>
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

      {stage === "fullname" ? (
        <Fullname
          firstName={first}
          lastName={last}
          setFirst={setFirst}
          setLast={setLast}
          setStage={setStage}
        />
      ) : (
        ""
      )}

      {stage === "verification" ? (
        <Verification push="/login" setStage={setStage} />
      ) : (
        ""
      )}
    </>
  );
};

export default Recovery;
