import React, { useState } from "react";

const Input = (props) => {
  const [has_value, set_value] = useState(false);

  const setValueHandler = (e) => {
    if (e.target.value) set_value(true);
    else set_value(false);
    props.onChange(e.target.value);
  };

  const validateInputClient = (input) => {
    if (input.name === "name") {
      if (!props.firstName.length && !props.lastName.length) {
        props.error(input.requiredBoth);
        props.check(false);
      } else if (!props.firstName.length) {
        props.error(input.requiredFirst);
        props.check(false);
      } else if (!props.lastName.length) {
        props.error(input.requiredLast);
        props.check(false);
      } else {
        props.check(true);
      }
    }

    if (input.name === "birth") {
      if (!props.month.length) {
        props.error(input.required);
        props.check(false);
      } else if (!props.year.length) {
        props.error(input.required);
        props.check(false);
      } else {
        props.check(true);
      }
    }
  };

  // {props.submitRegister ?  : ""}
  // {props.submitClientInfo ? validateInputClient(props.message) : ""}

  // if (props.submitRegister) {
  //   validateInputRegister(props.message);
  // } else if (props.submitClientInfo) {
  //   validateInputClient(props.message);
  // }

  return (
    <>
      <div
        className={`input-container ${
          props.containerClassName ? props.containerClassName : ""
        }`}
      >
        <input
          type={props.type}
          className={`form_field ${props.className ? props.className : ""}`}
          autoFocus={props.autoFocus || false}
          value={props.value}
          onChange={(e) => {
            setValueHandler(e);
          }}
        />

        <label className={`form_label ${has_value ? "filled" : ""}`}>
          {props.placeholder}
        </label>
      </div>
    </>
  );
};

export default Input;
