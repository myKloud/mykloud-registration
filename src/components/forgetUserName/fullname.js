import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../common/input";
import "./style.scss";

const Fullname = (props) => {
  const next = () => {
    props.setStage("verification");
  };

  return (
    <div className="form_container forget_user_form">
      <div className="form_wrapper">
        <h1 className="form_title mb-7 ">Forgot username</h1>
        <p className="form_subtitle mb-7 text-center">Enter your Full Name</p>
        <Input
          type="text"
          autoFocus={true}
          value={props.first}
          onChange={props.setFirst}
          className="recovery_input mb-7"
          placeholder="First name"
        />

        <Input
          type="text"
          value={props.last}
          onChange={props.setLast}
          className="recovery_input mb-7"
          placeholder="Last name"
        />

        <p className="note mb-7">
          You’ll recieve an email with a conformation code if above input is
          valid
        </p>

        <button className="next_btn" onClick={next}>
          Send me the code
        </button>
      </div>
    </div>
  );
};

export default Fullname;
